import { IServiceType } from "@/interface/IServiceData";
import axiosClient from "../axiosClient";
import { IAppoimentData } from "@/interface/IAppoinmentData";
import { set } from "mongoose";

export const getAppointmentAvailable = async (
  serviceId: string,
  date: Date,
  startOfday: Date,
  endOfday: Date
): Promise<IAppoimentData> => {
  return (
    await axiosClient.get(
      `/appointment/${serviceId}?date=${date}&startOfday=${startOfday}&endOfday=${endOfday}`,
      {
        withCredentials: true,
      }
    )
  ).data;
};

export const setAppointment = async (
  serviceId: string,
  date: Date,
  startTime: Date,
  endTime: Date
) => {
  return await axiosClient.post(
    `/appointment/${serviceId}/create-appointment`,
    {
      date,
      startTime,
      endTime,
      userId: "676c8e2cf401a3f7a9ac07a1",
    },
    {
      withCredentials: true,
    }
  );
};
