import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../http/crud.service';
import { StorageService } from '../storage/storage.service';
import { StorageKey } from '../storage/storage.model';
import Appointment from '../../models/appointment';

const { AUTH_TOKEN } = StorageKey;

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends CrudService{
  endpoint = 'healthcalendar';
  token: string;

  constructor(http: HttpClient, storage: StorageService) { 
    super(http);
    this.token = storage.read(AUTH_TOKEN) || '';
  }

  public async getAppointmens(id: string) {
    let res = null;
    try {
      if (!id) return res;
      this.endpoint = 'healthcalendar/appointments';
      res = await this.get<Appointment>(id);
    } catch (err) {
      res = this.errorHandler('getAppointmens', err);
    }
    return res;
  }

  public async saveAppointment(body: object) {
    let res = null;
    try {
      this.endpoint = 'healthcalendar/saveappointment';
      res = await this.post(body);
    } catch (err) {
      res = this.errorHandler('saveAppointment', err);
    }
    return res;
  }



}
