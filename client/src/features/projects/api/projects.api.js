import api from "../../../shared/api/api";

export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data.data;
};

export const getProjectCards = async () => {
  const response = await api.get("/projects/cards");
  return response.data.data;
};

export const getFeaturedProjectCards = async () => {
  const response = await api.get("/projects/featured");
  return response.data.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await api.get(`/projects/${slug}`);
  return response.data.data;
}