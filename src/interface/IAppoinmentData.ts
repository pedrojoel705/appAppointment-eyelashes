export interface IAppoimentData {
  availableAppointments: AvailableAppointment[];
  serviceInfo: ServiceInfo;
}

export interface AvailableAppointment {
  startTime: string;
  endTime: string;
  duration: number;
}

export interface ServiceInfo {
  name: string;
  duration: number;
  price: number;
}
