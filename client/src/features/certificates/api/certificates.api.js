import api from "../../../shared/api/api";

export async function getCertificates() {
  const { data } = await api.get("/certificates");
  return data.data;
}

export async function getIssuers() {
  const { data } = await api.get("/issuers");
  return data.data;
}

export async function getFeaturedCertificates() {
  const { data } = await api.get("/certificates/featured");
  return data.data;
}

export async function getCertificateCards() {
  const { data } = await api.get("/certificates/cards");
  return data.data;
}