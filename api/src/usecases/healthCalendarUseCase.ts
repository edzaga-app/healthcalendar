import AppointmetProfessional from "../models/appointmentProfessionals";
import AppointmentType from "../models/appointmentType";
import HealthCalendarRepository from "../repository/healthCalendarRepository";

class HealthCalendarUseCase extends HealthCalendarRepository {
  
  constructor(){
    super();
  }

  public async professionals() {
    let res = null;
    try {
      const [appointments, professionals ] = await Promise.all([
        this.getAppointmentType(),
        this.getProfessionalsById()
      ]); 
      res = appointments?.map((appointment: AppointmentType) => {
        const professionalsToFilter = (profesional: AppointmetProfessional) => profesional.appointmentId === appointment.id;
        const filteredProfessionals = professionals?.filter(professionalsToFilter);
        return {
          ...appointment,
          professionals: filteredProfessionals
        }
      });

    } catch (err) {
      console.error(`Error en ${this.className} => professionals`, err);
    }
    return res;
  }

  public async setPhoto(id: number | string) {
    let res: any = null;
    let photo: any = null;
    try {
      photo = await this.getPhoto(id);
      const bufferImg = photo![0][0]
      const typeImg = photo![0][1];
      res = { bufferImg, typeImg };

    } catch (err) {
      console.error(`Error en ${this.className} => getPhoto`, err);
    }
    return res;
  }

}

export default HealthCalendarUseCase;