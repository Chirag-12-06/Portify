import api from "../../../api/client";

export async function getEducations() {
  const { data } = await api.get("/educations");
  return data.data;
}

export async function getEducation(id) {
  const { data } = await api.get(`/educations/${id}`);
  return data.data;
}

export async function createEducation(values) {
  const { data } = await api.post("/educations", values);
  return data.data;
}

export async function updateEducation({ id, values }) {
  const { data } = await api.put(`/educations/${id}`, values);
  return data.data;
}

export async function deleteEducation(id) {
  const { data } = await api.delete(`/educations/${id}`);
  return data.data;
}