import api from "../../../shared/api/api";

export const getEducations = async () => {
  const { data } = await api.get("/educations");
  return data.data;
};