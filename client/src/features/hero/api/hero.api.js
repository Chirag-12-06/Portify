import api from "../../../shared/api/api";

export const getHeroes = async () => {
  const { data } = await api.get("/heroes");
  return data.data;
};