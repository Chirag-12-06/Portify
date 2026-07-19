import api from "./api";

export const getProfile = async () => {
  const { data } = await api.get("/profiles");
  return data.data;
};