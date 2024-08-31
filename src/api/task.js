import axios from "./axios";
import Cookies from "js-cookie";

const obtenerToken = () => {
  const cookies = Cookies.get();
  console.log("Empecé a ejecutar obtenerToken");
  let config = {
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  };
  console.log(`Las cookies son: ${cookies.token}`);
  return config;
};

export const getTasksRequest = () => axios.get("/turnos", obtenerToken());
export const getTaskRequest = (id) =>
  axios.get(`/turnos/${id}`, obtenerToken());
export const createTaskRequest = (task) =>
  axios.post("/turnos", task, obtenerToken());
export const updateTaskRequest = (id, task) =>
  axios.put(`/turnos/${id}`, task, obtenerToken());
export const deleteTaskRequest = (id) =>
  axios.delete(`/turnos/${id}`, obtenerToken());
export const getAdmTurnosRequest = () => axios.get("/admTask", obtenerToken());
