import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    const user = await UserModel.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" });
    }

    const isValid = await user.comparePassword(password);

    return NextResponse.json({
      email: user.email,
      passwordHash: user.password.substring(0, 30) + "...", // Solo primeros 30 caracteres
      passwordMatch: isValid,
      hasCompareMethod: typeof user.comparePassword === 'function'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
