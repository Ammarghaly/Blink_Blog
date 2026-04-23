import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-little-water-7369.fly.dev/api",
});

export default api;
