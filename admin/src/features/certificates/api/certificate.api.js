import api from "../../../api/client";

export async function getCertificates() {
  const response = await api.get("/certificates");
  return response.data.data;
}

export async function getCertificateById(id) {
  const response = await api.get(`/certificates/${id}`);
  return response.data.data;
}

export async function createCertificate(values) {
  const response = await api.post("/certificates", values);
  return response.data.data;
}

export async function updateCertificate({ id, values }) {
  const response = await api.put(`/certificates/${id}`, values);
  return response.data.data;
}

export async function deleteCertificate(id) {
  await api.delete(`/certificates/${id}`);
}