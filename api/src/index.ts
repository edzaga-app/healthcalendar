import './config/config';
import App from './app';
import HealthCalendar from './routes/healthCalendar';

const app = new App([
  new HealthCalendar()
]);

app.listen();

