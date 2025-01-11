import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ServiceModel } from "@/models";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const service = await ServiceModel.find({});
    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}
