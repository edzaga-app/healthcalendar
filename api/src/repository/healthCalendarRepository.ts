import Profession from '../models/profession';
import AppointmentType from '../models/appointmentType';
import User from '../models/user';
import CrudRepository from './crudRepository';
import Professionals from '../models/profesionals';
import RelationAppointmentType from '../models/relationAppointmentType';
import AppointmetProfessional from '../models/appointmentProfessionals';
import oracledb from 'oracledb';
import db from '../config/database';
import ScheduleAppointment from '../models/scheduleAppointment';

class HealthCalendarRepository extends CrudRepository {
  className = 'HealthCalendarRepository';

  constructor() { 
    super();
  }

  public async addAppointment(scheduleAppointment: ScheduleAppointment) {
    let res = null;
    let query: string;
    try {
      query = `
        BEGIN 
          PKG_SAL_STUDENTS.SP_APLICARCITA(
            :scheduleId,
            :userId,
            :appointmentId, 
            :hstdateStart,
            :id
          ); 
        END;`;
      res = await this.save(query, scheduleAppointment);

    } catch (err) {
      console.error(`Error en ${this.className} => saveAppointment`, err);
    }
    return res;
  }

  public async getAppointmens(id: number | string) {
    let res = null;
    let query: string;
    let bind: string[] = [];  
    try {
      if(!id) return res;
      bind.push(id.toString());
      query = `SELECT * FROM TABLE(PKG_SAL_STUDENTS.FUN_OBTENERCITAS(:id))`;
      res = await this.get<AppointmentType>(query, bind);

    } catch (err) {
      console.error(`Error en ${this.className} => getProfessionalsById`, err);
    }
    return res;
  }

  public async getAppointmens2(id: number | string) {
    let res = null;
    let conn;
    let value: any;
    try {
      conn = await oracledb.getConnection(db);
      const result = await conn.execute(
        `SELECT * FROM TABLE(PKG_SAL_STUDENTS.FUN_OBTENERCITAS(:id))`,
        [id],
        { resultSet: true }
      );

      if (result.rows?.length! > 0) {
        value = result.rows;
        res = value[0][0];
      }

    } catch (err) {
      console.error(`Error en ${this.className} => getValue`, err);
    } finally {
      if (conn) {
        await conn.close();
      }
    }
    return res;
  }

  /**
   * Obtiene la foto de un tercero
   * @param id Id del tercero 
   * @returns La foto del tercero
   */
  public async getPhoto(id: number | string) {
    let res = null;
    let conn;
    try {
      conn = await oracledb.getConnection(db);
      const result = await conn.execute(
        `SELECT CONTENT AS "photo",
          TYPE AS "type"
         FROM TABLE(CONSULTA_DESERCION.PKG_GENERAL.FUN_OBTENERFOTOTERCERO(
           SEGURIDAD.PKG_SEG_SEGURIDAD.DESENCRIPTAR3(:id))
         ) WHERE ROWNUM = 1`,
        [id],
        { 
          fetchInfo: {"photo": { type: oracledb.BUFFER }}
        }
      );
      res = result.rows ? result.rows : null;

    } catch (err) {
      console.error(`Error en ${this.className} => getPhoto`, err);
    } finally {
      if (conn) {
        await conn.close();
      }
    }
    return res;
  }

  /**
   * Obtiene la Lista de profesionales relacionados a un tipo de cita
   * @param id El id del tipo de la cita
   * @returns Lista de profesionales
   */
  public async getProfessionalsById() {
    let res = null;
    let query: string;
    let bind: string[] = [];
    try {
      query = `SELECT * FROM VI_SAL_PROFESIONALTIPOCITAS`;
      res = await this.get<AppointmetProfessional>(query, bind);

    } catch (err) {
      console.error(`Error en ${this.className} => getProfessionalsById`, err);
    }
    return res;
  }

  /**
   * Obtiene los profesionales parametrizados en el sistema de salud
   * @returns Los profesionales
   */
  public async getProfessionals() {
    let res = null;
    let query: string;
    let bind: string[] = [];
    try {
      query = `SELECT * FROM VI_SAL_PROFESIONALES`;
      res = await this.get<Professionals>(query, bind);

    } catch (err) {
      console.error(`Error en ${this.className} => getProfessionals`, err);
    }
    return res;
  }

  /**
   * Obtiene las relaciones con los tipos de citas 
   * según la profesión de cada profesional
   * @returns Los relaciones con los tipos de cita
   */
   public async getRelationAppointmentType() {
    let res = null;
    let query: string;
    let bind: string[] = [];
    try {
      query = `SELECT * FROM VI_SAL_RELACIONTIPOCITA`;
      res = await this.get<RelationAppointmentType>(query, bind);

    } catch (err) {
      console.error(`Error en ${this.className} => getRelationAppointmentType`, err);
    }
    return res;
  }

  /**
   * Obtiene los tipo de citas que se parametrizan en el sistema de salud
   * @returns Los tipos de citas
   */
  public async getAppointmentType() {
    let res = null;
    let query: string;
    let bind: string[] = [];
    try {
      query = `
        SELECT TIPO_CITA_ID AS "id",
          NOMBRE AS "profession"
        FROM TB_SAL_TIPO_CITA`;
      res = await this.get<AppointmentType>(query, bind);

    } catch (err) {
      console.error(`Error en ${this.className} => getAppointmentType`, err);
    }
    return res;
  }

  /**
   * Obtiene las profesiones relacionadas con el sistema de salud UTP
   * @returns Todas las profesiones activas
   */
  public async getProfessions() {
    let res = null;
    let query: string;
    let bind: string[] = [];
    try {
      query = `
        SELECT TIPO_PROFESION_ID AS "id",
          NOMBRE AS "profession"
        FROM TABLE(PKG_SAL_STUDENTS.FUN_OBTENERPROFESIONES)`;
      res = await this.get<Profession>(query, bind);

    } catch (err) {
      console.error(`Error en ${this.className} => getProfessions`, err);
    }
    return res;
  }

  /**
   * Obtiene el usuario de la aplicación con acceso 
   * a la evaluación docente
   * @param thirdpartyId Id del tercero
   * @returns datos básicos del usurio 
   */
   public async getUser(thirdpartyId: string): Promise<User | null> {
    let res = null;
    let query: string;
    let bind: string[] = [];
    try {
      if(!thirdpartyId) return res;
      bind.push(thirdpartyId);
      query = `SELECT * FROM VI_SAL_INFOUSUARIO WHERE "thirdpartyId" = :thirdpartyId`;
      const user = await this.get<User>(query, bind);
      
      res = user?.reduce((obj: any, item: User) => {
        obj = item;
        return obj;
      }, {});

    } catch (err) {
      console.error(`Error en ${this.className} => getUser`, err);
    }
    return res;
  }




}

export default HealthCalendarRepository;
