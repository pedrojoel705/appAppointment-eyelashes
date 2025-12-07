"use server";

import { UserModel } from "@/models";
import dbConnect from "@/lib/dbConnect";

const normalizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim();
};

interface RegisterData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

interface RegisterResult {
  success: boolean;
  error?: string;
  fieldErrors?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
  };
}

export async function registerUser(data: RegisterData): Promise<RegisterResult> {
  try {
    const { firstName, lastName, phone, email, password } = data;

    // Validaciones del servidor
    const fieldErrors: RegisterResult["fieldErrors"] = {};

    if (!firstName?.trim()) {
      fieldErrors.firstName = "El nombre es requerido";
    }

    if (!lastName?.trim()) {
      fieldErrors.lastName = "El apellido es requerido";
    }

    if (!phone?.trim()) {
      fieldErrors.phone = "El teléfono es requerido";
    } else if (phone.length < 10) {
      fieldErrors.phone = "El teléfono debe tener al menos 10 dígitos";
    }

    if (!email?.trim()) {
      fieldErrors.email = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      fieldErrors.email = "El correo no es válido";
    }

    if (!password) {
      fieldErrors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      fieldErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { success: false, fieldErrors };
    }

    await dbConnect();


    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return { 
        success: false, 
        fieldErrors: { email: "Este correo ya está registrado" }
      };
    }

    // Normalizar datos
    const parseEmail = email.toLowerCase();
    const parseFirstName = normalizeText(firstName).toLowerCase();
    const parseLastName = normalizeText(lastName).toLowerCase();

    // Crear usuario - la contraseña se encripta automáticamente en el modelo con pre("save")
    const newUser = new UserModel({
      firstName: parseFirstName,
      lastName: parseLastName,
      phonne: phone,
      email: parseEmail,
      password, // Se encripta automáticamente con bcrypt en el hook pre("save")
      role: "client",
    });

    await newUser.save();

    return { success: true };
  } catch (error: any) {
    console.error("Error en registerUser:", error);
    return { success: false, error: "Error al crear la cuenta" };
  }
}
