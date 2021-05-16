import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../http/crud.service';
import { StorageService } from '../storage/storage.service';
import { StorageKey } from '../storage/storage.model';
import Professionals from '../../models/profesionals';
import { Observable } from 'rxjs';

const {AUTH_TOKEN} = StorageKey;

@Injectable({
  providedIn: 'root'
})
export class HomePageService extends CrudService {
  endpoint = 'healthcalendar';
  token: string;

  constructor(http: HttpClient, storage: StorageService) {
    super(http);
    this.token = storage.read(AUTH_TOKEN) || '';
  }

  public async getProfessionals(body: Object) {
    let res = null;
    try {
      this.endpoint = 'healthcalendar/professionals';
      res = await this.get<Professionals>('');
    } catch (err) {
      res = this.errorHandler('getProfessionals', err);
    }
    return res;
  }

  public async getPhoto(id: number | string) {
    let res = null;
    try {
      this.endpoint = `healthcalendar/photo/${id}`;
      res = await this.get('');
    } catch (err) {
      res = this.errorHandler('getPhoto', err);
    }
    return res;
  }


  

}
