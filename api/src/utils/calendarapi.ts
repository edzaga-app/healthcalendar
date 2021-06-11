import { google } from 'googleapis';

class CalendarApi {
  // Configuración
  credentials = JSON.parse(process.env.CREDENTIALS_CALENDAR!);
  calendarId = process.env.CALENDAR_ID!;
  // Configuración api de Google
  calendar = google.calendar('v3');
  scopes = 'https://www.googleapis.com/auth/calendar';

  auth = new google.auth.JWT(
    this.credentials?.client_email,
    undefined,
    this.credentials?.private_key,
    this.scopes
  );

  constructor() { }

  public insertEvent = async() => {
    try {
      let res = await this.calendar.events.insert({
        auth: this.auth,
        calendarId: this.calendarId,
        requestBody: { 
          summary: 'Google I/O 2015',
          location: '800 Howard St., San Francisco, CA 94103',
          description: 'A chance to hear more about Google\'s developer products.',
          start: { 
            dateTime: '2021-07-02T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
          },
          end: { 
            dateTime: '2021-07-02T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
          },
          attendees: [
            { email: 'edwar.zapata@utp.edu.co' },
            { email: 'edzaga.app@gmail.com' }
          ],
          reminders: {
            useDefault: false,
            overrides: [
              {method: 'email', 'minutes': 24 * 60},
              {method: 'popup', 'minutes': 10},
            ]
          }
        }
      })

      console.log(res);
      


    } catch (err) {
      console.error(`Error en CalendarApi => insertEvent`, err);
    }
  }


  /**
   * Verifica la autencitación de las apis de google
   * @returns authToken: son las credenciales de autenticación
   */
  public getAuthToken = async() => {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes:[
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/calendar.events'
        ]
      });
      // Crea la instancia del cliente para la autenticación
      const authToken = await auth.getClient();
      return authToken;

    } catch (err) {
      console.error(`Error en CalendarApi => getAuthToken`, err);
    }
  }

  public listEvents(auth: any) {
    let res = null;
    try {
      const calendar = google.calendar({version: 'v3', auth});
      res = calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res?.data.items;
        if (events?.length) {
          console.log('Upcoming 10 events:');
          events.map((event: any, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log('No upcoming events found.');
        }
      });
    } catch (err) {
      console.error(`Error en CalendarApi => listEvents`, err);
    }
    return res;
  }

  public createEvent = async() => {
    const authClient = await this.getAuthToken();
    const calendar = google.calendar({version: 'v3', auth: authClient});
    //google.options({auth: authClient});
    try {
      const res = await calendar.events.insert({
        calendarId: 'primary',
        auth: authClient,
        requestBody: { 
          summary: 'Google I/O 2015',
          location: '800 Howard St., San Francisco, CA 94103',
          description: 'A chance to hear more about Google\'s developer products.',
          start: { 
            dateTime: '2021-06-03T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
          },
          end: { 
            dateTime: '2021-06-03T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
          },
          attendees: [
            { email: 'fleurety3@gmail.com' }
          ],
          reminders: {
            useDefault: false,
            overrides: [
              {method: 'email', 'minutes': 24 * 60},
              {method: 'popup', 'minutes': 10},
            ]
          }
        }
      });
  
      console.log(res.data);

    } catch (err) {
      console.error(`Error en CalendarApi => createEvent`, err);
    }

  }  
  
}

export default CalendarApi;