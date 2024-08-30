import axios from "axios";

const instance = axios.create({
  baseURL: "https://src-blue-kappa.vercel.app/api",
  withCredentials: true,
});

export default instance;
