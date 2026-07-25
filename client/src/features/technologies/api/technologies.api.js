import api from "../../../shared/api/api";

export async function getTechnologies() {
  const { data } = await api.get("/technologies");
  return data.data;
}