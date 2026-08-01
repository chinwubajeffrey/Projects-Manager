import { useEffect, useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuthStore } from "../store/authStore.js";
import { Triangle } from "react-loader-spinner";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const enterProject = (id) => {
    return navigate("/projects/" + id);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const project = await API.get("/projects");
        // console.log(project.data);
        setProjects(project.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || description === "") {
      console.log("Input projct details");
      return "error";
    }

    try {
      const newProject = await API.post("/projects", { name, description });
      setProjects([...projects, newProject.data]);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <div className="h-screen w-screen flex justify-center items-center">
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
    <div className="font-mont bg-[#d9d9d9] h-screen px-4">
      <Navbar />
      <div className="px-4 sm:px-20 flex flex-col sm:flex-row sm:items-center justify-between my-5">
        <h1 className="text-5xl font-bold">Welcome {user.name}</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-800 mt-5 text-amber-50 py-3 w-auto sm:w-[10vw] rounded-4xl hover:cursor-pointer"
        >
          New project
        </button>
      </div>
      <p className="text-xl w-full px-5 sm:px-21 font-cor">Your Projects</p>
      {showForm && (
        <div className="form fixed z-10 h-screen top-0 left-0 w-screen  bg-[rgba(0,0,0,0.21)] backdrop-blur-sm">
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <form action="" onSubmit={handleSubmit}>
              <div className="form bg-amber-50 flex flex-col p-7 py-10 rounded-2xl gap-3 justify-between items-center">
                <h1 className="text-5xl font-bold">New Project</h1>
                <input
                  className="m-4 p-3 text-l w-full border-b-2 border-green-800 outline-none"
                  type="text"
                  placeholder="Project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="m-4 p-3 text-l w-full border-b-2 border-green-800 outline-none"
                  type="text"
                  placeholder="Project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-800 text-amber-50 w-full py-3 mt-10 rounded-4xl hover:cursor-pointer"
                >
                  Submit
                </button>
                <button
                  className="bg-red-800 text-amber-50 w-full py-3 rounded-4xl hover:cursor-pointer"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="project grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-10 mx-4 sm:mx-20">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => enterProject(project.id)}
            className="card border border-b-black p-5 rounded-xl hover:cursor-pointer"
          >
            <div className="name text-xl font-medium my-5">
              {project.name.toUpperCase()}
            </div>
            <div className="description text-sm">{project.description}</div>
            <div className="members my-3">
              Members: {project._count.memberships}
            </div>
            <div className="role my-3">Role: {project.memberships[0].role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
