import Professionals from "./profesionals";

interface AppointmentType {
    id: string;
    profession: string;
    proffesionals?: Professionals[];
}

export default AppointmentType;