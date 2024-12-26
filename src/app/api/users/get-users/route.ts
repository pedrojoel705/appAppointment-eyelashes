import dbConnect from "@/lib/dbConnect";
import { User } from "@/models";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({});
    console.log("Se conectó a la base de datos");
    return NextResponse.json({ users: users });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener usuarios" });
  }
}
