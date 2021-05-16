import { Request, Response, Router } from 'express';
import Auth from '../middlewares/auth';
import Route from '../models/route';
import HealthCalendarRepository from '../repository/healthCalendarRepository';
import HealthCalendarUseCase from '../usecases/healthCalendarUseCase';

class HealthCalendarController implements Route {
  public path = '/healthcalendar';
  public router = Router();
  private className = 'HealthCalendarController';
  private authMiddleware = new Auth();
  private health = new HealthCalendarRepository();
  private useCases = new HealthCalendarUseCase();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Rutas del para el calendario
    this.router.get(`${this.path}/professions`, this.authMiddleware.auth, this.getAllProfessions);
    this.router.get(`${this.path}/appointmenttype`, this.authMiddleware.auth, this.getAppointmentType);
    this.router.get(`${this.path}/professionals`, this.authMiddleware.auth, this.getProfessionals);
    this.router.get(`${this.path}/professionals/:id`, this.authMiddleware.auth, this.getProfessionals);
    this.router.get(`${this.path}/photo/:id`, this.authMiddleware.auth, this.getPhoto);
    this.router.get(`${this.path}/appointments/:id`, this.authMiddleware.auth, this.getAppointmens);

  }

  private getAppointmens = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const photo = await this.useCases.getAppointmens(id);
      res.send(photo);
    } catch (err) {
      console.error(`Error en ${this.className} => getAppointmens`, err);
    }
  }

  private getProfessionals = async (_: Request, res: Response) => {
    try {
      const professionals = await this.useCases.professionals();
      res.send(professionals);
    } catch (err) {
      console.error(`Error en ${this.className} => getProfessionals`, err);
    }
  }

  private getPhoto = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const photo = await this.useCases.setPhoto(id);
      res.send(photo);
    } catch (err) {
      console.error(`Error en ${this.className} => getPhoto`, err);
    }
  }

  private getAppointmentType = async (_: Request, res: Response) => {
    try {
      const appointment = await this.health.getAppointmentType();
      res.send(appointment);
    } catch (err) {
      console.error(`Error en ${this.className} => getAppointmentType`, err);
    }
  }

  private getAllProfessions = async (_: Request, res: Response) => {
    try {
      const professions = await this.health.getProfessions();
      res.send(professions);
    } catch (err) {
      console.error(`Error en ${this.className} => getAllProfessions`, err);
    }
  }
}

export default HealthCalendarController;
