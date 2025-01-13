import { AppointmentModel, ServiceModel, UserModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ serviceId: string }> }
) {
  const params = await props.params;
  try {
    const { serviceId } = await params;
    const body = await request.json();

    if (!serviceId || !body) {
      return NextResponse.json(
        { error: "Cannot create appointment, some data is missing" },
        { status: 400 }
      );
    }

    const { date, startTime, endTime, userId } = body;

    if (!date || !startTime || !endTime || !userId) {
      return NextResponse.json(
        { error: "Cannot create appointment, some data is missing" },
        { status: 400 }
      );
    }
    console.log("userId", userId);

    const newAppointment = await AppointmentModel.create({
      date,
      startTime,
      endTime,
      userId,
      serviceId,
      status: "pending",
    });

    newAppointment.save();

    return NextResponse.json(
      {
        message: "Appointment had created succefully",
        newAppointment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting appointment", error);
    return NextResponse.json(
      { error: "Error getting appointment" },
      { status: 500 }
    );
  }
}
