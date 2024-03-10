import axios from "axios";

const token1 = localStorage.getItem("token");

export const baseurl = axios.create({
  baseURL: "https://e-backend-8z4t.onrender.com",
  timeout: 10000,
  headers: { "X-Custom-Header": `${token1}` },
});
