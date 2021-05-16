import './config/config';
import App from './app';
import HealthCalendarController from './controllers/healthCalendarController';
import AuthController from './controllers/authController';

const app = new App([
  new HealthCalendarController(),
  new AuthController(),
]);

app.listen();
