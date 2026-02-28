import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ⚠️ Do NOT attach token on login/register
  if (token && !config.url.includes("/auth/login") && !config.url.includes("/auth/register")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;