import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { IService } from "@/models/modelService";
import { AppointmentModel, ServiceModel } from "@/models";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    // Obtener los parámetros de manera estática
    const searchParams = new URL(request.url).searchParams;
    const serviceId = searchParams.get("serviceId");
    const date = searchParams.get("date");
    const startOfday = searchParams.get("startOfday");
    const endOfday = searchParams.get("endOfday");

    // Validación de parámetros requeridos
    if (!serviceId || !date || !startOfday || !endOfday) {
      return NextResponse.json(
        { error: "Cannot create appointment, some data is missing" },
        { status: 400 }
      );
    }

    const service = (await ServiceModel.findById(serviceId)) as IService;

    if (!service) {
      return NextResponse.json(
        { error: "Service does not exist" },
        { status: 404 }
      );
    }

    const serviceDuration = service.duration;

    const startDate = new Date(startOfday);
    const endDate = new Date(endOfday);

    const reservedAppointments = await AppointmentModel.find({
      startTime: { $gte: startDate, $lt: endDate },
      endTime: { $gte: startDate, $lt: endDate },
    });

    const availableAppointments = [];
    let currentTime = new Date(startDate);

    while (currentTime < endDate) {
      const endTime = new Date(currentTime.getTime() + serviceDuration * 60000);

      const isOverlapping = reservedAppointments.some(
        (appointment) =>
          (currentTime >= new Date(appointment.startTime) &&
            currentTime < new Date(appointment.endTime)) ||
          (endTime > new Date(appointment.startTime) &&
            endTime <= new Date(appointment.endTime))
      );

      if (!isOverlapping && endTime <= endDate) {
        availableAppointments.push({
          startTime: currentTime.toISOString(),
          endTime: endTime.toISOString(),
        });
      }

      currentTime = new Date(currentTime.getTime() + 60000);
    }

    return NextResponse.json({ availableAppointments }, { status: 200 });
  } catch (error) {
    console.error("Error creating appointment", error);
    return NextResponse.json(
      { error: "Error creating appointment" },
      { status: 500 }
    );
  }
}
