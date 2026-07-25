import api from "../../../api/client";

export async function getProfile() {
  const { data } = await api.get("profiles");
  return data;
}

export async function updateProfile(profile) {
  const { data } = await api.put("profiles", profile);
  return data;
}