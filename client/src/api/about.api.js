import api from "./api";

export const getAbout = async () => {
  const { data } = await api.get("/about");
  return data.data;
};