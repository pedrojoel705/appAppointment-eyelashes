import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any });

    if (!token || !token.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { email, phone, password } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "El teléfono es requerido" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar teléfono
    user.phonne = phone;

    // Actualizar contraseña solo si se proporcionó
    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return NextResponse.json(
      { message: "Perfil actualizado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Error al actualizar el perfil" },
      { status: 500 }
    );
  }
}
