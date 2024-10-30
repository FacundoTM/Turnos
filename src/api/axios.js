import axios from "axios";

const instance = axios.create({
  baseURL: "https://backturnos-production.up.railway.app/api",
  withCredentials: true,
});

export default instance;

//https://backturnos.onrender.com/api
