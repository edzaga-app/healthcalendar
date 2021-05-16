import { Component, OnInit } from '@angular/core';
import AppointmentType from 'src/app/core/models/appointmentType';
import Professionals from 'src/app/core/models/profesionals';
import { HomePageService } from 'src/app/core/services/pages/home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  className = 'HomePageComponent';
  step: number = 0;
  professionals: AppointmentType[];
  
  constructor(private homePageService: HomePageService) { }

  ngOnInit(): void {
    this.getProfessionals();

  }

  setSchedule(professional: Professionals) {
    
    console.log(professional);
    
  }

  private async getProfessionals() {
    let res = null;
    let body = new Object();
    try {
      body = { evaluationId: 202 };
      res = await this.homePageService.getProfessionals(body);
      this.professionals = res;
    } catch (err) {
      console.error(`Error en ${this.className} => getProfessionals`, err);
    }
    return res;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
