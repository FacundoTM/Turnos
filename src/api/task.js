import axios from "./axios";

export const getTasksRequest = () => axios.get("/turnos");
export const getTaskRequest = (id) => axios.get(`/turnos/${id}`);
export const createTaskRequest = (task) => axios.post("/turnos", task);
export const updateTaskRequest = (id, task) => axios.put(`/turnos/${id}`, task);
export const deleteTaskRequest = (id) => axios.delete(`/turnos/${id}`);
export const getAdmTurnosRequest = () => axios.get("/admTask");
