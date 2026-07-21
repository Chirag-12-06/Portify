import api from "./api";

export const getEducations = async () => {
  const { data } = await api.get("/educations");
  return data.data;
};