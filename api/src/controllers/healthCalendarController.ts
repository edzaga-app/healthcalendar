import { Request, Response } from 'express';
import HealthCalendarRepository from '../repository/healthCalendarRepository';

class HealthCalendarController extends HealthCalendarRepository {
    
    constructor() { 
        super();
    }

    public getAllProfessions = async(req: Request, res: Response) => {
        let professions = await this.getProfessions();
        console.log(professions);
        
    }
    

}

export default HealthCalendarController;

