import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import utc from "dayjs/plugin/utc";
import days from "dayjs";
days.extend(utc);

function TasksFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const cookies = Cookies.get();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        if (!task) return navigate("/turnos");
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", days(task.date).utc().format("YYYY-MM-DD"));
      }
      if (!params.id) {
        setValue("date", days().utc().format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, {
        ...data,
        token: cookies.token,
        date: days.utc(data.date).format(),
      });
    } else {
      createTask({
        ...data,
        date: days.utc(data.date).format(),
      });
    }
    navigate("/turnos");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg - zinc - 800 max-w-md w-full p-10 rounded-m">
        <h1 className="text-2xl font-bold">
          {params.id ? "Editar turno" : "Solicitar turno"}
        </h1>
        <form onSubmit={onSubmit}>
          <input
            className="text-white bg-zinc-700 w-full px-4 py-2 rounded-md my-2"
            {...register("title", { required: true })}
            type="text"
            placeholder="Vehiculo (Ej: Toyota SW4)"
          />
          <input
            {...register("description", { required: true })}
            className="text-white bg-zinc-700 w-full px-4 py-2 rounded-md my-2"
            rows="3"
            placeholder="Piso y torre (Ej: 311 | Torre: 3 Piso: 11)"
          ></input>
          <input
            className="text-white bg-zinc-700 w-full px-4 py-2 rounded-md my-2"
            type="date"
            {...register("date", { required: true })}
          />
          <button className="mt-3 bg-indigo-500 px-3 py-2 rounded-md">
            {params.id ? "Editar turno" : "Aceptar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TasksFormPage;
