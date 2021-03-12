import express from 'express';
import cors from 'cors';
import HealthCalendar from "./routes/healthCalendar";
import Route from './models/route';


class App {
  public app: express.Application;
  

  constructor(routes: Route[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server on port ${process.env.PORT}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach(route => {
      this.app.use('/api/healthcalendar', route.router);
    });
    
    // const healthCalendar = new HealthCalendar();
    // this.app.use('api/healthcalendar', healthCalendar.setRoutes);
  }

  public getServer() {
    return this.app;    
  }

}

export default App;



// const app = express();


// export default app;