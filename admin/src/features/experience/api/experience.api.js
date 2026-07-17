import api from "../../../api/client";

export const getExperiences = async () => {
  const { data } = await api.get("/experiences");
  return data.data;
};

export const getExperience = async (id) => {
  const { data } = await api.get(`/experiences/${id}`);
  return data.data;
};

export const createExperience = async (values) => {
  const { data } = await api.post("/experiences", values);
  return data.data;
};

export const updateExperience = async ({ id, values }) => {
  const { data } = await api.put(`/experiences/${id}`, values);
  return data.data;
};

export const deleteExperience = async (id) => {
  await api.delete(`/experiences/${id}`);
};