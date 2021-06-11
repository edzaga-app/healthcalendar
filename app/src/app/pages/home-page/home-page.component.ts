import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import AppointmentType from 'src/app/core/models/appointmentType';
import Professionals from 'src/app/core/models/profesionals';
import { SpinnerService } from 'src/app/core/services/http/spinner.service';
import { HomePageService } from 'src/app/core/services/pages/home-page.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { StorageKey } from 'src/app/core/services/storage/storage.model';

const { PROFESSIONAL_INFO } = StorageKey;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  className = 'HomePageComponent';
  professionals: AppointmentType[];
  professional: Professionals;

  constructor(
    private homePageService: HomePageService,
    private snackBar: MatSnackBar,
    private spinnerService: SpinnerService,
    private storage: StorageService,
  ) {
    this.tokenValidate();
    this.storage.remove(PROFESSIONAL_INFO);  
  }

  ngOnInit(): void {
     this.getProfessionals();
  }

  private async getProfessionals() {
    let res = null;
    this.spinnerService.show();
    try {
      res = await this.homePageService.getProfessionals();
      this.professionals = res;
      this.spinnerService.hide();

    } catch (err) {
      this.spinnerService.hide();
      this.validateError(err);
      console.error(`Error en ${this.className} => getProfessionals`, err);
    }
    return res;
  }

  sharedProfessionalInfo(professional: Professionals) {
    this.storage.save(PROFESSIONAL_INFO, professional);
  }
  
  message(message: string) {
    this.snackBar.open(message, null, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['inter-line']
    })
  }

  validateError(err: any) {
    if (!err?.error.auth) {
      this.message(`La Sesión a expirado por inactividad prolongada. \n
                 Por favor inicie nuevamente sesión en el Portal Estudiantil`);
      setTimeout(() => {
        window.location.href = 'https://app4.utp.edu.co/pe/';
      }, 3100);
    }
  }

  tokenValidate() {
    if(!this.homePageService.token) return;
    window.history.replaceState(null, null, window.location.href.replace(`/${this.homePageService.token}`, ''));
  }



}
