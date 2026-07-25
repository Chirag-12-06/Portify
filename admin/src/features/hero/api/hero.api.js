import api from "../../../api/client";

export async function getHeroes() {
  const { data } = await api.get("heroes");
  return data;
}

export async function updateHero(hero) {
  const { data } = await api.put("heroes", hero);
  return data;
}