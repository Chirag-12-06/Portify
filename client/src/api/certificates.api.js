import api from "./api";

export async function getCertificates() {
  const { data } = await api.get("/certificates");
  return data.data;
}