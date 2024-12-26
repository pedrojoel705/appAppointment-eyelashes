import { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  firtsName: string;
  lastName: string;
  phonne: string;
  email: string;
  password: string;
  role: string;
}

export const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phonne: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "client" },
    password: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
