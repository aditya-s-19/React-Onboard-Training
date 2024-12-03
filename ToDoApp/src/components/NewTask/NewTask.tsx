import { useState } from "react";
import styles from "./newTask.module.css";
import { v4 as uuid } from "uuid";
import { getDate, isEmptyDate, isPastDate, isValidName, warning } from "../../utility/task";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/tasks";

function NewTask() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>(getDate());

  const handleNewTask = (): void => {
    if (isValidName(name) && !isEmptyDate(date) && !isPastDate(date)) {
      dispatch(
        addTask({
          id: uuid(),
          name: name.trim(),
          isDone: false,
          dueDate: date,
        })
      );
      setName("");
    } else {
      isPastDate(date) && toast.error(warning.datePast);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.taskNameInput}
        type="text"
        placeholder="Enter Task"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={styles.taskDateInput}
        type="date"
        min={getDate()}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        id=""
      />
      <button className={styles.addTaskButton} onClick={() => handleNewTask()}>
        Add Task
      </button>
    </div>
  );
}

export default NewTask;
