import { useTasks } from "../context/TasksContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ButtonCard from "./ButtonCard";

import utc from "dayjs/plugin/utc";
import days from "dayjs";
days.extend(utc);

function TaskCard({ task }) {
  const { deleteTask, readyTask } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-[#693AFF] shadow-lg shadow-zinc-500/50 max-w-md m-auto w-3/4 p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="antialiased text-2xl font-bold">{task.title}</h1>
      </header>
      <small className="font-semibold text-sm pl-1">
        (Piso: {task.description}) - Fecha:{" "}
      </small>
      <small className="font-semibold antialiased text-sm">
        {days(task.date).utc().format("DD/MM/YYYY")}
      </small>
      <small className="font-semibold antialiased text-sm">
        {user.rank === 1 ? " | " + user.username : ""}
      </small>
      <div className="flex gap-x-2 mt-5">
        {task.isReady === false ? (
          <>
            <ButtonCard
              texto="Eliminar"
              onClick={() => {
                deleteTask(task._id);
              }}
            />

            <Link
              className="transition ease-in-out delay-150 duration-300 border border-white text-white  font-semibold text-sm antialiased px-4 py-2 rounded-md"
              to={`/turnos/${task._id}`}
            >
              Editar
            </Link>
          </>
        ) : (
          <>
            <p className="text-white underline">El vehiculo está listo.</p>
          </>
        )}
        {task.isReady === false && user.rank === 1 ? (
          <ButtonCard
            texto="Listo"
            onClick={() => {
              readyTask(task._id);
              navigate("/sucess");
            }}
          />
        ) : (
          ""
        )}
      </div>
      {task.isReady == true && user.rank === 1 ? (
        <>
          <br />
          <div className="flex gap-x-2">
            <ButtonCard
              texto="Eliminar"
              onClick={() => {
                deleteTask(task._id);
              }}
            />

            <Link
              className="transition ease-in-out delay-150 duration-300 border border-white text-white  font-semibold text-sm antialiased px-4 py-2 rounded-md"
              to={`/turnos/${task._id}`}
            >
              Editar
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default TaskCard;
