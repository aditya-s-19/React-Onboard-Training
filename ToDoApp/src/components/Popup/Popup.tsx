import { useState } from "react";
import { Task } from "../../Types/Tasks";
import styles from "./popup.module.css";
import { getDate, isEmptyDate, isPastDate, isValidName, warning } from "../../utility/task";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateTask } from "../../features/tasks";

type Props = {
  type: "edit" | "delete";
  deleteFn?: () => void;
  onEditFinish?: () => void;
  task?: Task;
  cancelFn: () => void;
};

function Popup({ type, deleteFn, onEditFinish, task, cancelFn }: Props) {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(task ? task.name : "");
  const [isDone, setIsDone] = useState<boolean>(task ? task.isDone : false);
  const [dueDate, setDueDate] = useState<string>(task ? task.dueDate : "");
  const originalDate: string = task ? task.dueDate : "";

  const editTask = (): void => {
    if (dueDate === originalDate || (!isEmptyDate(dueDate) && !isPastDate(dueDate))) {
      if (task && onEditFinish && isValidName(name)) {
        const editedTask: Task = {
          id: task.id,
          name: name.trim(),
          dueDate,
          isDone,
        };
        dispatch(updateTask(editedTask));
        onEditFinish();
      }
    } else {
      isPastDate(dueDate) && toast.error(warning.dateChangedPast);
    }
  };

  return (
    <div className={styles.popupWrapper}>
      {type === "delete" && deleteFn && (
        <div className={`${styles.deleteCard} ${styles.popupCard}`}>
          <h1>Are you sure of deleting this task?</h1>
          <div className={styles.buttonContainer}>
            <button className={styles.popupButton} onClick={deleteFn}>
              Yes
            </button>
            <button className={styles.popupButton} onClick={cancelFn}>
              No
            </button>
          </div>
        </div>
      )}
      {type === "edit" && onEditFinish && task && (
        <div className={`${styles.editCard} ${styles.popupCard}`}>
          <h1>Edit Task</h1>
          <div className={styles.editTaskContainer}>
            <input
              className={styles.taskIsDoneCheckbox}
              type="checkbox"
              checked={isDone}
              onChange={() => setIsDone(!isDone)}
              id=""
            />
            <input
              className={styles.taskNameInput}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.taskDateInput}
              type="date"
              min={getDate()}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              id=""
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={`${styles.popupButton} ${styles.submitButton}`} onClick={() => editTask()}>
              Submit
            </button>
            <button className={styles.popupButton} onClick={cancelFn}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
