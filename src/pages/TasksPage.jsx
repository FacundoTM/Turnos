import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";

function TasksPage() {
  const { getTasks, tasks, getAdmTurnos, admTurnos } = useTasks();
  const { user } = useAuth();

  const checkRank = () => {
    user.rank == 1 ? getAdmTurnos() : getTasks();
  };

  useEffect(() => {
    checkRank();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TasksPage;
