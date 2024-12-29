import mongoose from "mongoose";
import { IUser, UserSchema } from "@/models/modelUser";
import { AppointmentsSchema, IAppointments } from "./modelAppointment";
import { IService, ServiceSchema } from "./modelService";

export const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export const AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model<IAppointments>("Appointment", AppointmentsSchema);

export const ServiceModel =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
