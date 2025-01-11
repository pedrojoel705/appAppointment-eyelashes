import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { IService } from "@/models/modelService";
import { AppointmentModel, ServiceModel } from "@/models";

export async function GET(
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  await dbConnect();

  try {
    const serviceId = params.serviceId;
    const { searchParams } = new URL(request.url);

    const date = searchParams.get("date");
    const startOfday = searchParams.get("startOfday");
    const endOfday = searchParams.get("endOfday");

    if (!serviceId || !date || !startOfday || !endOfday) {
      return NextResponse.json(
        { error: "Cannot get appointment, some data is missing" },
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

    // Modificación aquí: avanzamos por bloques de la duración del servicio
    while (currentTime < endDate) {
      const endTime = new Date(currentTime.getTime() + serviceDuration * 60000);

      // Si el bloque termina después del horario de cierre, terminamos
      if (endTime > endDate) {
        break;
      }

      const isOverlapping = reservedAppointments.some(
        (appointment) =>
          (currentTime >= new Date(appointment.startTime) &&
            currentTime < new Date(appointment.endTime)) ||
          (endTime > new Date(appointment.startTime) &&
            endTime <= new Date(appointment.endTime))
      );

      if (!isOverlapping) {
        availableAppointments.push({
          startTime: currentTime.toISOString(),
          endTime: endTime.toISOString(),
          duration: serviceDuration, // añadimos la duración para referencia
        });
      }

      // Avanzamos al siguiente bloque según la duración del servicio
      currentTime = new Date(currentTime.getTime() + serviceDuration * 60000);
    }

    return NextResponse.json(
      {
        availableAppointments,
        serviceInfo: {
          name: service.name,
          duration: serviceDuration,
          price: service.price,
        },
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
// date": "2024-01-05T00:00:00.000Z",
//   "startTime": "2024-01-05T09:00:00.000Z",
//   "endTime": "2024-01-05T10:00:00.000Z",
//   "userId": "676c8e2cf401a3f7a9ac07a1"
