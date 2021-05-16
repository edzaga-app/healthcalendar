import { Component, Input, OnInit } from '@angular/core';
import Professionals from 'src/app/core/models/profesionals';

@Component({
  selector: 'app-button-schedule',
  templateUrl: './button-schedule.component.html',
  styleUrls: ['./button-schedule.component.scss']
})
export class ButtonScheduleComponent implements OnInit {
  @Input() profesional: Professionals;
  
  constructor() { }

  ngOnInit(): void {
  }

}
