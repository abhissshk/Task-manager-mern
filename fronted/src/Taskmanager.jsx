import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskById, GetAllTask, UpdateTaskById } from "./api";
import { notify } from "./utlis";

function Taskmanager() {
  const [input, setinput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpateTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTask = () => {
    if (updateTask && input) {
      console.log("update api call");
      handleUpdate();
    } else if (!updateTask && input) {
      console.log("create api call");
      handleAddtask();
    }
  };

  useEffect(() => {
    if (updateTask) {
      setinput(updateTask.taskName);
    }
  }, [updateTask]);

  const handleAddtask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };

    try {
      const { success, message } = await CreateTask(obj);

      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      setinput("");
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("failed to create task", "error");
    }
  };

  const fetchAllTasks = async () => {
  try {
    setLoading(true);

    const response = await GetAllTask();
    const data = response?.data || [];

    setTasks(data);
    setCopyTasks(data);

  } catch (err) {
    console.error(err);
    notify("failed to fetch tasks", "error");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);

      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("failed to create task", "error");
    }
  };

  const handleCheckAndUncheck = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };

    try {
      const { success, message } = await UpdateTaskById(_id, obj);

      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("failed to create task", "error");
    }
  };

  const handleUpdate = async () => {
    const obj = {
      taskName: input,
      isDone: updateTask.isDone,
    };

    try {
      const { success, message } = await UpdateTaskById(updateTask._id, obj);

      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }

      setUpateTask(null);
      setinput("");
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("failed to update task", "error");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (!value) {
      setTasks(copyTasks); // reset
    } else {
      const filtered = copyTasks.filter((task) =>
        task.taskName.toLowerCase().includes(value),
      );
      setTasks(filtered);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
      <h1 className="mb-4 ">Task Manager App</h1>
      {/* input and search box */}
      <div className="d-flex justify-content-between align-item-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            className="form-control me-1"
            placeholder="Add a new task"
          />
          <button onClick={handleTask} className="btn btn-success btn-sm me-2">
  {updateTask ? <FaPencilAlt /> : <FaPlus />}
</button>
        </div>

        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            className="form-control"
            type="text"
            placeholder="Search tasks"
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* list of items */}

      <div className="d-flex flex-column w-100">

  {loading && (
    <p className="text-center mt-3">Loading...</p>
  )}

  {!loading && tasks?.length === 0 && (
    <p className="text-center mt-3">No tasks found</p>
  )}

  {!loading && tasks?.map((item) => (
    <div key={item._id} className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center">
      
      <span className={item.isDone ? "text-decoration-line-through" : ""}>
        {item.taskName}
      </span>

      <div>
        <button onClick={() => handleCheckAndUncheck(item)} className="btn btn-success btn-sm me-2">
          <FaCheck />
        </button>

        <button onClick={() => setUpateTask(item)} className="btn btn-primary btn-sm me-2">
          <FaPencilAlt />
        </button>

        <button onClick={() => handleDeleteTask(item._id)} className="btn btn-danger btn-sm me-2">
          <FaTrash />
        </button>
      </div>
    </div>
  ))}

</div>

      {/* toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default Taskmanager;
