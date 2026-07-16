import api from "../../../api/client";

export async function getSocialLinks() {
  const { data } = await api.get("/social-links");
  return data;
}

export async function createSocialLink(values) {
  const { data } = await api.post("/social-links", values);
  return data;
}

export async function updateSocialLink({ id, values }) {
  const { data } = await api.put(
    `/social-links/${id}`,
    values
  );
  return data;
}

export async function deleteSocialLink(id) {
  const { data } = await api.delete(
    `/social-links/${id}`
  );
  return data;
}