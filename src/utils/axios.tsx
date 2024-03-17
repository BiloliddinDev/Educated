import axios from "axios";

const token1 = localStorage.getItem("token");

export const baseurl = axios.create({
  baseURL: "https://e-center-backend-gbuy.onrender.com/api",
  timeout: 5000,
  headers: { "X-Custom-Header": `${token1}` },
});
