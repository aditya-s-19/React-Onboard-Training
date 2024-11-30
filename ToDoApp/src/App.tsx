import "./App.css";
import Todo from "./components/Todo/Todo";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <div className="container">
        <Todo></Todo>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
