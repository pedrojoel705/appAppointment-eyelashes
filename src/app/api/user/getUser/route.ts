import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";
import { UserModel } from "@/models";

export async function GET(request: NextRequest) {
  await dbConnect();

  // Recupera el userId y role de los encabezados
  const userId = request.headers.get("userId");
  const role = request.headers.get("userRole");

  if (!userId || !role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await UserModel.find({});

    console.log(users,"esta logueado")
    return NextResponse.json({ users: users });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}
