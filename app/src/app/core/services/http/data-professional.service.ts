import { EventEmitter, Injectable, Output } from '@angular/core';
import Professionals from '../../models/profesionals';

@Injectable({
  providedIn: 'root'
})
export class DataProfessionalService {
  @Output() dataProfessional: EventEmitter<Professionals> = new EventEmitter();
  @Output() loadPhoto: EventEmitter<boolean> = new EventEmitter();
  @Output() scheduledAppointment: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }
}
