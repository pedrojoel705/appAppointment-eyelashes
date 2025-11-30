import { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  phonne?: string;
  email: string;
  password?: string;
  role: string;
  comparePassword(password: string): Promise<boolean>;
}

export const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: false, default: "Usuario" },
    lastName: { type: String, required: false, default: "" },
    phonne: { type: String, required: false, default: "" },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: "client" },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
