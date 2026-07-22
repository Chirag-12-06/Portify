import api from "../../../api/client";

export async function getTechnologies(params = {}) {
  const { data } = await api.get("/technologies", {
    params,
  });

  return data.data;
}

export async function getTechnologyById(id) {
  const { data } = await api.get(`/technologies/${id}`);

  return data.data;
}

export async function createTechnology(values) {
  const { data } = await api.post("/technologies", values);

  return data.data;
}

export async function updateTechnology({ id, values }) {
  const { data } = await api.put(`/technologies/${id}`, values);

  return data.data;
}

export async function deleteTechnology(id) {
  const { data } = await api.delete(`/technologies/${id}`);

  return data.data;
}