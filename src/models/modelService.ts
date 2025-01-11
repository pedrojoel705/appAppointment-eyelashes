import { Schema, Document } from "mongoose";

export interface IService extends Document {
  _id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export const ServiceSchema: Schema<IService> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    category: {
      type: String,
      enum: ["cejas", "pestañas", "asesoria", "combos", "otros"],
      required: true,
    },
  },
  { timestamps: true }
);
