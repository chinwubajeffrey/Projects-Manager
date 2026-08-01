import React, { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import API from "../api/axios.js";
import { useAuthStore } from "../store/authStore.js";

const BoardColumn = ({ board, onTaskClick }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleAddTask = async (e) => {
    if (taskTitle === "") {
      return console.error("Nigga the hell");
    }
    e.preventDefault();
    try {
      const createTask = await API.post(`/boards/${board.id}/tasks`, {
        title: taskTitle,
        createdById: user.id,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="border flex flex-col justify-between gap-5 border-b-black p-5 w-full rounded-xl hover:cursor-pointer">
        <div className="flex justify-between items-center text-xl font-medium">
          <div>{board.name}</div>{" "}
          <div className="text-sm text-gray-600">{board.tasks.length}</div>
        </div>
        {board.tasks.map((task) => (
          <TaskCard
            task={task}
            key={task.id}
            priority={task.priority}
            onTaskClick={onTaskClick}
          />
        ))}
        {showForm && (
          <div className="form">
            <form onSubmit={handleAddTask}>
              <input
                className=" p-3 text-l  border-b-2 border-green-800 outline-none"
                type="text"
                placeholder="Title"
                onChange={(e) => setTaskTitle(e.target.value)}
                value={taskTitle}
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-800 text-amber-50 mt-3 py-2 px-5 rounded-4xl hover:cursor-pointer"
                >
                  Create
                </button>

                <button
                  onClick={(e) => setShowForm(false)}
                  className="bg-green-800 text-amber-50 mt-3 py-2 px-5 rounded-4xl hover:cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <button
          className="bg-green-800 text-amber-50 w-full py-3 rounded-4xl hover:cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default BoardColumn;
