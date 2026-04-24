import api from "./axios";

export const loginRequest = async (email: string, password: string) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
};
