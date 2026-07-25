import api from "../../../shared/api/api";

export const getProfile = async () => {
  const { data } = await api.get("/profiles");
  return data.data;
};