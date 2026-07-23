import api from "./api";

export const getExperiences = async () => {
  const { data } = await api.get("/experience");
  return data.data;
};