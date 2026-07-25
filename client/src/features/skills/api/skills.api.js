import api from "../../../shared/api/api";

export async function getSkills() {
  const { data } = await api.get("/skills");
  return data.data;
}