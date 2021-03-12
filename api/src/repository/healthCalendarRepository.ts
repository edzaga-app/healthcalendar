import oracledb from 'oracledb';
import db from '../config/database';

class HealthCalendarRepository {
  constructor() { }

  public getProfessions = async() => {
    let res = [];
    let conn;
    try {
      console.log(db);
      conn = await oracledb.getConnection(db);
      const result = await conn.execute(
        `BEGIN :ret := PKG_SAL_STUDENTS.FUN_OBTENERPROFESIONES(); END; `,
        {
          ret: { dir: oracledb.BIND_OUT, type: oracledb.OUT_FORMAT_ARRAY}
        }
      );
      console.log(result);

      
    } catch (err) {
      console.error(`Error en HealthCalendarRepository => getProfessions`, err);
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }



}

export default HealthCalendarRepository;
