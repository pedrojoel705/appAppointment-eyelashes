import mongoose from "mongoose";
import { IUser, UserSchema } from "@/models/modelUser";
import { AppointmentsSchema, IAppointments } from "./modelAppointment";
import { IService, ServiceSchema } from "./modelService";

// Borrar el modelo existente si existe para forzar recreación
if (mongoose.models.User) {
  delete mongoose.models.User;
}

export const UserModel = mongoose.model<IUser>("User", UserSchema);

export const AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model<IAppointments>("Appointment", AppointmentsSchema);

export const ServiceModel =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
