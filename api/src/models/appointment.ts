interface Appointment {
  id: number;
	patientId: number;
	staffId: number;
	appointmentTypeId: number;
	note: string;
	locationId: number;
	categoryId: number;
	initialDate: string;
	endDate: string;
	appointmentStatusId: number;
	modificationDate: string;
	user: number;
}

export default Appointment;