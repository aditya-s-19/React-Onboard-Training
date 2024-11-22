import { useContext, useEffect, useState } from "react";
import NewTask from "../NewTask/NewTask";
import TaskList from "../TaskList/TaskList";
import styles from "./todo.module.css";
import { tasksContext } from "../../App";
import { Task } from "../../Types/Tasks";
import { FaCloudSun } from "react-icons/fa";

const Todo = () => {
  const { tasks } = useContext(tasksContext);
  const [showTasks, setShowTasks] = useState<Task[]>(tasks);
  const [selectBy, setSelectBy] = useState<string>("All Tasks");
  const [sortBy, setSortBy] = useState<string>("Due Closest");
  const selectValues = ["All Tasks", "Done", "Not Done"];
  const sortValues = ["Due Closest", "Due Farthest"];

  const updateShowTasks = (): void => {
    let selectedTasks: Task[] = [];
    if (selectBy === "All Tasks") selectedTasks = [...tasks];
    else if (selectBy === "Done") selectedTasks = [...tasks.filter((task) => task.isDone)];
    else selectedTasks = [...tasks.filter((task) => !task.isDone)];

    selectedTasks.sort((a: Task, b: Task) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortBy === "Due Closest" ? dateA - dateB : dateB - dateA;
    });

    setShowTasks(selectedTasks);
  };

  useEffect(() => {
    updateShowTasks();
  }, [tasks, selectBy, sortBy]);

  return (
    <>
      <div className={styles.todo}>
        <div className={styles.heading}>
          <FaCloudSun size={"100px"} />
          <h1>Todo</h1>
        </div>

        <select
          className={styles.showOptions + " " + styles.selectBy}
          name="Sort by"
          value={selectBy}
          onChange={(e) => setSelectBy(e.target.value)}
          id=""
        >
          {selectValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          className={styles.showOptions}
          name="Sort by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          id=""
        >
          {sortValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        {showTasks.length > 0 ? <TaskList showTasks={showTasks} /> : <p>Empty List</p>}
        <NewTask />
      </div>
    </>
  );
};

export default Todo;
