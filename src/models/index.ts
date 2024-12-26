import mongoose from "mongoose";
import { IUser, UserSchema } from "@/models/User";

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
