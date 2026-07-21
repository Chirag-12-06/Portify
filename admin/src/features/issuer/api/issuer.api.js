import api from "../../../api/client";

export async function getIssuers() {
  const response = await api.get("/issuers");
  return response.data.data;
}

export async function getIssuerById(id) {
  const response = await api.get(`/issuers/${id}`);
  return response.data.data;
}

export async function createIssuer(values) {
  const response = await api.post("/issuers", values);
  return response.data.data;
}

export async function updateIssuer({ id, values }) {
  const response = await api.put(`/issuers/${id}`, values);
  return response.data.data;
}

export async function deleteIssuer(id) {
  await api.delete(`/issuers/${id}`);
}