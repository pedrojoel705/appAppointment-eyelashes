"use server";

import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models";
import { validators, PHONE_PREFIX_ARGENTINA } from "@/utils/validators";
import { CompleteProfileData, CompleteProfileResult } from "@/interface/ICompleteProfile";




export async function completeProfile(
  data: CompleteProfileData
): Promise<CompleteProfileResult> {
  try {
    const { email, phone, password } = data;

    // Validaciones
    const fieldErrors: { phone?: string; password?: string } = {};

    const phoneError = validators.phone(phone);
    if (phoneError) {
      fieldErrors.phone = phoneError;
    }

    if (password) {
      const passwordError = validators.password(password, false);
      if (passwordError) {
        fieldErrors.password = passwordError;
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      return {
        success: false,
        fieldErrors,
      };
    }

    await dbConnect();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return {
        success: false,
        error: "Usuario no encontrado",
      };
    }

    // Actualizar teléfono con el prefijo argentino
    user.phonne = `${PHONE_PREFIX_ARGENTINA}${phone}`;

    // Actualizar contraseña solo si se proporcionó
    if (password) {
      user.password = password; // El modelo tiene un pre-save hook que hashea la contraseña
    }

    await user.save();

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: "Error al actualizar el perfil",
    };
  }
}
