interface ScheduleAppointment {
  scheduleId: number;
  appointmentId: number;
  hstdateStart: Date;
  userId: number;
  professionalId: string;
}

export default ScheduleAppointment;