import api from "../../../api/client";

export async function getSkills(params = {}) {
  const { data } = await api.get("/skills", {
    params,
  });

  return data.data;
}

export async function getSkillById(id) {
  const { data } = await api.get(`/skills/${id}`);

  return data.data;
}

export async function createSkill(values) {
  const { data } = await api.post("/skills", values);

  return data.data;
}

export async function updateSkill({ id, values }) {
  const { data } = await api.put(`/skills/${id}`, values);

  return data.data;
}

export async function deleteSkill(id) {
  const { data } = await api.delete(`/skills/${id}`);

  return data.data;
}