import { IServiceType } from "@/interface/IServiceData";
import axiosClient from "../axiosClient";

export const getServiceList = async (): Promise<IServiceType> => {
  return (
    await axiosClient.get("/service-list", {
      withCredentials: true,
    })
  ).data.service;
};
