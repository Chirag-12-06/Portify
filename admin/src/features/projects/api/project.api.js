import api from "../../../api/client";

export async function getProjects() {
  const response = await api.get("/projects");
  return response.data.data;
}

export async function getProjectBySlug(slug) {
  const response = await api.get(`/projects/${slug}`);
  return response.data.data;
}

export async function createProject(values) {
  const response = await api.post("/projects", values);
  return response.data.data;
}

export async function updateProject({ id, values }) {
  const response = await api.put(`/projects/${id}`, values);
  return response.data.data;
}

export async function deleteProject(id) {
  await api.delete(`/projects/${id}`);
}