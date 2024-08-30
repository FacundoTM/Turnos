import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import utc from "dayjs/plugin/utc";
import days from "dayjs";
days.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const { user } = useAuth();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </header>
      <p
        className={
          task.description === "Listo" ? "text-green-500" : "text-slate-200"
        }
      >
        {task.description}
      </p>
      <p className="text-slate-300">
        {days(task.date).utc().format("DD/MM/YYYY")}
      </p>
      <div className="flex gap-x-2 items-center mt-5">
        {task.description === "Listo" ? (
          ""
        ) : (
          <>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Eliminar
            </button>
            <Link
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              to={`/turnos/${task._id}`}
            >
              Editar
            </Link>
          </>
        )}
        {task.description === "Listo" && user.rank == 1 ? (
          <>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Eliminar
            </button>
            <Link
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              to={`/turnos/${task._id}`}
            >
              Editar
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TaskCard;
