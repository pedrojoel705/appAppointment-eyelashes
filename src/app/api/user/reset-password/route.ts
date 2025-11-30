import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Email y nueva contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Buscar el usuario
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar la contraseña (el pre-save hook la encriptará automáticamente)
    user.password = newPassword;
    await user.save();

    return NextResponse.json({
      message: "Contraseña actualizada exitosamente",
      email: user.email,
    });
  } catch (error: any) {
    console.error("Error al resetear contraseña:", error);
    return NextResponse.json(
      { error: "Error al resetear contraseña" },
      { status: 500 }
    );
  }
}

// Endpoint para listar usuarios (para que veas los emails)
export async function GET() {
  try {
    await dbConnect();

    const users = await UserModel.find({}, { email: 1, firtsName: 1, lastName: 1, role: 1 });

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}
