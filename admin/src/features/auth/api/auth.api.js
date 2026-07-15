import api from "../../../api/client";

export const loginAdmin = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const logoutAdmin = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const getCurrentAdmin = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};