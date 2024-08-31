import { createContext, useContext, useState } from "react";
import { createTaskRequest, deleteTaskRequest } from "../api/task";
import {
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
  getAdmTurnosRequest,
  readyTaskRequest,
} from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks tiene que ser usado con TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [admTurnos, setAdmTurnos] = useState([]);

  const getAdmTurnos = async () => {
    try {
      const res = await getAdmTurnosRequest();
      setTasks(res.data);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "No se pudo obtener la tareas de admin." });
    }
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "No se pudo obtener las tareas." });
    }
  };

  const createTask = async (task) => {
    try {
      await createTaskRequest(task);
    } catch (error) {
      return res.status(404).json({ message: "No se pudo crear la tarea." });
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id != id));
    } catch (error) {
      return res.status(404).json({ message: "No se pudo borrar la tarea." });
    }
  };

  const readyTask = async (id, task) => {
    try {
      await readyTaskRequest(id, task);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      return console.error({ message: "No se pudo obtener la tarea." });
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        updateTask,
        getTask,
        deleteTask,
        tasks,
        createTask,
        getTasks,
        getAdmTurnos,
        admTurnos,
        readyTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
