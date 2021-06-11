import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarRoutingModule } from './calendar-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { MatToolbarDialogComponent } from '../../core/components/mat-toolbar-dialog/mat-toolbar-dialog.component';
import { ModalCalendarComponent } from './modal-calendar/modal-calendar.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [CalendarComponent, MatToolbarDialogComponent, ModalCalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents:[ModalCalendarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarModule { }
