import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import BoardColumn from "../components/BoardColumn.jsx";
import TaskDetail from "../components/TaskDetail.jsx";
import { Triangle } from "react-loader-spinner";
import Navbar from "../components/Navbar.jsx";

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

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="flex w-full h-[80%] justify-center items-center">
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
          <div className="flex flex-col justify-around w-full h-full px-20">
            <h1 className="text-5xl font-bold">{project.name}</h1>
            <div className="flex">
              {selectedTask && (
                <TaskDetail
                  task={selectedTask}
                  onClose={() => setSelectedTask(null)}
                  projectId={id}
                />
              )}
              {project?.boards?.map((board) => (
                <div key={board.id}>
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
