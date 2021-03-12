import * as express from 'express';
import HealthCalendarController from '../controllers/healthCalendarController';
import Profession from '../models/profession';

class HealthCalendar extends HealthCalendarController {
  public path = '/profesiones'
  public router = express.Router();

  // public router: express.Router();
  // private healthCalendarController = new HealthCalendarController();

  private professions: Profession[] = [
    {
      id: 'DEMO_1',
      profession: 'DEV'
    }
  ];


  constructor() { 
    super();
    this.router = express.Router();
    this.initializeRoutes();
  }

  public initializeRoutes() {
      this.router.get('/profesiones', this.getAllProfessions);
  } 

  getAll = (request: express.Request, response: express.Response) => {
    response.send(this.professions);
  }

}

export default HealthCalendar;
