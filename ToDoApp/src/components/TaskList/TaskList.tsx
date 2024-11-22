import { Task } from "../../Types/Tasks";
import SingleTask from "../SingleTask/SingleTask";

type Props = {
  showTasks: Task[];
};

const TaskList = ({ showTasks }: Props) => {
  return (
    <div>
      {showTasks.map((task) => (
        <SingleTask key={task.id} task={task}></SingleTask>
      ))}
    </div>
  );
};

export default TaskList;
