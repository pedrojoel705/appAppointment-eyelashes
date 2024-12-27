import axiosClient from "../axiosClient";

export const getCurrentUser = async () => {
  try {
    const response = await axiosClient.get("/user");
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Error getting current user", error);
    return { error: "Error getting current user" };
  }
};
