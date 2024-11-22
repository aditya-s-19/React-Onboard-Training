import { useContext, useState } from "react";
import Popup from "../Popup/Popup";
import { Task } from "../../Types/Tasks";
import styles from "./singleTask.module.css";
import { tasksContext } from "../../App";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { isPastDate } from "../../utility/task";

type Props = {
  task: Task;
};

const SingleTask = ({ task }: Props) => {
  const { removeTask, toggleTaskIsDone } = useContext(tasksContext);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isHoverOverName, setIsHoverOverName] = useState<boolean>(false);
  const formattedDate: string = new Date(task.dueDate)
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\//g, "-");

  return (
    <div className={styles.taskContainer + (isPastDate(task.dueDate) ? ` ${styles.pastDue}` : ``)} id={task.id}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id="checkIsDone"
        checked={task.isDone}
        onChange={() => toggleTaskIsDone(task)}
      />
      <p
        className={
          styles.taskName + (task.isDone ? ` ${styles.slashed}` : ``) + (isHoverOverName ? ` ${styles.scrolling}` : ``)
        }
        onMouseEnter={() => setIsHoverOverName(true)}
        onMouseLeave={() => setIsHoverOverName(false)}
      >
        {task.name}
      </p>
      <p className={styles.taskDueDate}>{formattedDate} </p>

      <button className={styles.editButton + ` ${styles.taskButton}`} onClick={() => setIsEdit(true)}>
        <MdOutlineModeEdit size={35} />
      </button>

      <button className={styles.deleteButton + ` ${styles.taskButton}`} onClick={() => setIsDelete(true)}>
        <FaRegTrashAlt size={30} />
      </button>

      {isDelete && <Popup type="delete" deleteFn={() => removeTask(task)} cancelFn={() => setIsDelete(false)}></Popup>}
      {isEdit && (
        <Popup type="edit" task={task} onEditFinish={() => setIsEdit(false)} cancelFn={() => setIsEdit(false)} />
      )}
    </div>
  );
};

export default SingleTask;
