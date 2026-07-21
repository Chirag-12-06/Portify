import api from "./api";

export async function getCertificates() {
  const { data } = await api.get("/certificates");
  return data.data;
}

export async function getIssuers() {
  const { data } = await api.get("/issuers");
  return data.data;
}