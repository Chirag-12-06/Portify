import api from "../../../shared/api/api";

export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data.data;
};