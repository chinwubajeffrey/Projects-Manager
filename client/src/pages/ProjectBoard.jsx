import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import BoardColumn from "../components/BoardColumn.jsx";
import TaskDetail from "../components/TaskDetail.jsx";
import { Triangle } from "react-loader-spinner";
import Navbar from "../components/Navbar.jsx";
import io from "socket.io-client";

const ProjectBoard = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const projectId = await API.get(`/projects/${id}`);
        setProject(projectId.data);
        console.log(projectId.data);

        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const socket = async () => {
      const connect = await io("http://localhost:5000");
      connect.emit("join-project", { id: id });
      connect.on("task-update", ({ boardId, task }) => {});
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="flex flex-col md:flex-row w-full h-[80%] justify-center items-center">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <Triangle
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div className="flex flex-col justify-around w-full h-full px-4 sm:px-20">
            <h1 className="text-5xl my-3 font-mont font-bold">
              {project.name}
            </h1>
            <div className="flex flex-wrap w-full h-full justify-center gap-4">
              {selectedTask && (
                <TaskDetail
                  task={selectedTask}
                  onClose={() => setSelectedTask(null)}
                  projectId={id}
                />
              )}
              {project?.boards?.map((board) => (
                <div key={board.id} className="w-full h-full flex gap-3">
                  <BoardColumn board={board} onTaskClick={setSelectedTask} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectBoard;
