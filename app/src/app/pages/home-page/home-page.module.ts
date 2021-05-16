import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { PhotoModule } from 'src/app/core/components/photo/photo.module';
import { ButtonScheduleComponent } from './button-schedule/button-schedule.component';


@NgModule({
  declarations: [ HomePageComponent, ButtonScheduleComponent ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    PhotoModule
  ],
  entryComponents:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
