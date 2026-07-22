import api from "./api";

export async function getTechnologies() {
  const { data } = await api.get("/technologies");
  return data.data;
}