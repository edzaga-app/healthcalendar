import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataProfessionalService } from 'src/app/core/services/http/data-professional.service';
import { CalendarService } from 'src/app/core/services/pages/calendar.service';

interface DialogData {
  scheduleId: number;
  appointmentId: number;
  name: string;
  professionalId: number | string;
  date: string;
  state: boolean;
}

@Component({
  selector: 'app-modal-calendar',
  templateUrl: './modal-calendar.component.html',
  styleUrls: ['./modal-calendar.component.scss']
})
export class ModalCalendarComponent implements OnInit {
  className: string = 'ModalCalendarComponent';
  constructor(
    public dialogRef: MatDialogRef<ModalCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private calendarService: CalendarService,
    private dataProfessionalService: DataProfessionalService
  ) { }

  ngOnInit(): void { }

  scheduleAppointment() {
    if (!this.data) {
      this.message('Error al agendar la cita, comuniquese con el administrador');
      return;
    }
    this.dialogRef.close(false);
    this.saveAppointment(this.data);
  }

  async saveAppointment(data: DialogData) {
    let res = null;
    try {
      res = await this.calendarService.saveAppointment(data);
      if (res?.id > 0) {
        this.message('Su cita fué agendada con éxito!');
        data.state = true;
        this.dataProfessionalService.scheduledAppointment.emit(data.state);
      } else  {
        this.message(res?.error);
      }
      
    } catch (err) {
      console.error(`Error en ${this.className} => saveAppointment`, err);
    }
    return res;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  message(message: string) {
    this.snackBar.open(message, null, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}
