import { ServiceModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import { dataService } from "./dataService";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: NextRequest) {
  await dbConnect();

  console.log("Seeding services data...");
  try {
    await ServiceModel.deleteMany({});
    await ServiceModel.insertMany(dataService);

    return NextResponse.json(
      { message: "Service has created ", count: dataService.length },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error creating seed" }, { status: 500 });
  }
}
