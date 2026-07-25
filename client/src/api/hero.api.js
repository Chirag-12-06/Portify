import api from "./api";

export const getHeroes = async () => {
  const { data } = await api.get("/heroes");
  return data.data;
};