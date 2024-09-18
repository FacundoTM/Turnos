import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";

function TasksPage() {
  const { getTasks, tasks, getAdmTurnos } = useTasks();
  const { user } = useAuth();

  const checkRank = () => {
    user.rank == 1 ? getAdmTurnos() : getTasks();
  };

  useEffect(() => {
    checkRank();
  }, []);

  return (
    <>
      <h1 className="mb-8 mt-8 pt-5 font-semibold text-center uppercase text-2xl text-[#9473FE]">
        turnos
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}

export default TasksPage;
