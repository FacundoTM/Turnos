import axios from "axios";

const instance = axios.create({
  baseURL: "https://backturnos.onrender.com/api",
  withCredentials: true,
});

export default instance;
