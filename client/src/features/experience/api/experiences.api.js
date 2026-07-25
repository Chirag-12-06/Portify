import api from "../../../shared/api/api";

export const getExperiences = async () => {
  const { data } = await api.get("/experiences");
  return data.data;
};