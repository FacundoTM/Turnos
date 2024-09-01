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
    <div
      className={
        task.isReady === true
          ? "bg-zinc-900 shadow-lg shadow-cyan-500/50 max-w-md w-full p-10 rounded-md"
          : "bg-zinc-800 shadow-lg shadow-zinc-500/50 max-w-md w-full p-10 rounded-md"
      }
    >
      <header className="flex justify-between">
        <h1 className="antialiased text-2xl font-bold">
          {task.title}
          <small className="font-normal text-sm pl-1">
            ({task.description})
          </small>
        </h1>
      </header>
      <small className="font-light antialiased text-sm">
        {days(task.date).utc().format("DD/MM/YYYY")}
      </small>

      <div className="flex gap-x-2 mt-5">
        {task.isReady === false ? (
          <>
            <button
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 border border-cyan-500 text-white hover:text-cyan-500 font-bold text-sm antialiased px-4 py-2 rounded-md"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Eliminar
            </button>
            <Link
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 border border-cyan-500 text-white hover:text-cyan-500 font-bold text-sm antialiased px-4 py-2 rounded-md"
              to={`/turnos/${task._id}`}
            >
              Editar
            </Link>
          </>
        ) : (
          <>
            <p className="text-cyan-500">Tu coche está listo!</p>
          </>
        )}

        {task.isReady == true && user.rank === 1 ? (
          <>
            <br />
            <button
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 border border-cyan-500 text-white hover:text-cyan-500 font-bold text-sm antialiased px-4 py-2 rounded-md"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Eliminar
            </button>
            <Link
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 border border-cyan-500 text-white hover:text-cyan-500 font-bold text-sm antialiased px-4 py-2 rounded-md"
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
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300 border border-cyan-500 text-white hover:text-cyan-500 font-bold text-sm antialiased px-4 py-2 rounded-md"
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
