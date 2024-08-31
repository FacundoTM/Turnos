import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import utc from "dayjs/plugin/utc";
import days from "dayjs";
days.extend(utc);

function TaskCard({ task }) {
  const { deleteTask, readyTask } = useTasks();
  const { user } = useAuth();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </header>
      <p className={"text-slate-200"}>{task.description}</p>
      <p className="text-slate-300">
        {days(task.date).utc().format("DD/MM/YYYY")}
      </p>
      <div className="flex gap-x-2 items-center mt-5">
        {task.isReady === false ? (
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
          <p className="text-green-500">Tu coche está listo!</p>
        )}

        {task.isReady == true && user.rank === 1 ? (
          <>
            <br />
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

        {task.isReady === false && user.rank === 1 ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              readyTask(task._id);
            }}
          >
            Listo!
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TaskCard;
