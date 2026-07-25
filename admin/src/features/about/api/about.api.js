import api from "../../../api/client";

export async function getAbout() {
  const { data } = await api.get("about");
  return data;
}

export async function updateAbout(about) {
  const { data } = await api.put("about", about);
  return data;
}