import mongoose, { Schema, Document } from "mongoose";

export interface IAppointments extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  serviceId: mongoose.Schema.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: "reserved" | "canceled" | "pending";
}

export const AppointmentsSchema: Schema<IAppointments> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["reserved", "canceled", "pending"],
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

AppointmentsSchema.index({ startTime: 1, endTime: 1 });

AppointmentsSchema.index({ userId: 1, startTime: 1 });
