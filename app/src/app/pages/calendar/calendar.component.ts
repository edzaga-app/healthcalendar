import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  CalendarOptions, 
  DateSelectArg, 
  EventApi, 
  EventClickArg, 
  EventInput
} from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import Appointment from 'src/app/core/models/appointment';
import { SpinnerService } from 'src/app/core/services/http/spinner.service';
import { CalendarService } from 'src/app/core/services/pages/calendar.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { StorageKey } from 'src/app/core/services/storage/storage.model'; 
import { ModalCalendarComponent } from './modal-calendar/modal-calendar.component';
import Professionals from 'src/app/core/models/profesionals';

const { PROFESSIONAL_INFO } = StorageKey;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  className = 'CalendarComponent';
  calendarVisible = true;
  calendarOptions: CalendarOptions;
  currentEvents: EventApi[] = [];
  initialEvents: EventInput[];
  loadData: boolean = false;
  stateAppointmen: boolean = false;
  professional: Professionals;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private calendarService: CalendarService,
    private spinnerService: SpinnerService,
    private storage: StorageService,
    public dialog: MatDialog,
  ) {  }

  async ngOnInit(): Promise<void> {
    this.getProfessional();
    const id = this.route.snapshot.paramMap.get('thirdpartyId');
    const appointments = await this.getAppointmens(id);
    this.setInitialEvents(appointments);
    this.initializedCalendarOptions();
  }

  async getAppointmens(id: string) {
    let res = null;
    this.spinnerService.show();
    try {
      res = await this.calendarService.getAppointmens(id);
      this.spinnerService.hide();

    } catch (err) {
      this.spinnerService.hide();
      console.error(`Error en ${this.className} => getAppointmens`, err);
    }
    return res;
  }     

  getProfessional() {
    this.professional = this.storage.read(PROFESSIONAL_INFO);
  }

  setInitialEvents(appointments: Appointment[]) {
    try {
      if (!appointments) return appointments;
      this.spinnerService.show();
      this.initialEvents = appointments?.map((element: any) => {
        return {
          id: element.id,
          title: 'Disponible',
          start: element.initialDate, 
          savedDate: element.savedDate // Se envía la propiedad de HST_FECHA_INICIAL
        };
      });
      this.loadData = true;
      this.spinnerService.hide();

    } catch (err) {
      this.spinnerService.hide();
      console.error(`Error en ${this.className} => setInitialEvents`, err);
    }
  }

  initializedCalendarOptions() {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      initialView: 'dayGridMonth',
      locale: esLocale,
      timeZone: "local",
      eventTimeFormat: {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit"
      },
      initialEvents: this.initialEvents, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }

  backTo() {
    this.storage.remove(PROFESSIONAL_INFO);
    this.router.navigate([`/app/inicio/${this.calendarService.token}`])
  }

  handleEventClick(clickInfo: EventClickArg) {
    const dateAppointment = clickInfo.event.start.toLocaleDateString("es-Co", { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute:'2-digit' 
    });
    const savedDate = new Date(clickInfo.event.extendedProps?.savedDate);

    const dialogRef = this.dialog.open(ModalCalendarComponent, {
      width: '500px',
      data: {
        scheduleId: clickInfo.event.id,
        appointmentId: this.professional?.appointmentId,
        name: this.professional?.name,
        date: dateAppointment,
        hstdateStart: savedDate, // Se almacena en esta propiedad la fecha en que fue guardada en elk host
        state: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.stateAppointmen = (!result) ? false : result;
      if (this.stateAppointmen) {
        clickInfo.event.remove();
      }

    });
    
  }


  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);
    
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // calendarApi.addEvent({
      //   id: createEventId(),
      //   title,
      //   start: selectInfo.startStr,
      //   end: selectInfo.endStr,
      //   allDay: selectInfo.allDay
      // });
    }
  }

  

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }



}
