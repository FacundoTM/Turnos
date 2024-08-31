import axios from "./axios";
import Cookies from "js-cookie";

const cookies = Cookies.get();

let config = {
  headers: {
    Authorization: `Bearer ${cookies.token}`,
  },
};

export const getTasksRequest = () => axios.get("/turnos", config);
export const getTaskRequest = (id) => axios.get(`/turnos/${id}`, config);
export const createTaskRequest = (task) => axios.post("/turnos", task, config);
export const updateTaskRequest = (id, task) =>
  axios.put(`/turnos/${id}`, task, config);
export const deleteTaskRequest = (id) => axios.delete(`/turnos/${id}`, config);
export const getAdmTurnosRequest = () => axios.get("/admTask", config);
