export interface EventType {
  id: number;
  day: number;
  name: string;
  image: string;
  venue: string;
  time: string;
  contact: string[];
  rule: string;
}

export interface RegistrationData {
  name: string;
  phone: string;
  college: string;
  department: string;
  email: string;
  academicYear: string;
  otherYear: string;
  events: number[];
}
