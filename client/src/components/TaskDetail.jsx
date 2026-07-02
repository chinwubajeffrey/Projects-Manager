import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Triangle } from "react-loader-spinner";

const TaskDetail = ({ task, onClose, projectId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const getComment = await API.get(`/tasks/${task.id}/comments`);
        setLoading(false);
        setComments(getComment.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const createComment = async (e) => {
    e.preventDefault();
    try {
      const addComment = await API.post(`/tasks/${task.id}/comments`, {
        content: newComment,
      });

      setComments([...comments, addComment.data]);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed h-screen w-screen z-10 bg-amber-50">
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
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
        <div className="flex h-full w-full font-cor items-center justify-center">
          <div className="card p-4 -mt-50 border flex ">
            <div className="w-full border-r flex flex-col justify-between px-4">
              <div>
                <h1 className="text-xl font-mont mb-3">{task.title}</h1>
                <p className="priority text-sm">Priority: {task.priority}</p>
                {task.dueDate && <p className="date">{task.dueDate}</p>}
              </div>

              <button
                className="bg-green-800 mt-10 text-amber-50 py-2 px-5 rounded-4xl"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            <div className="comment px-4">
              <h1 className="text-xl font-mont mb-4">Comments</h1>
              {comments.map((comment) => (
                <div className="n pb-5 scroll-auto" key={comment.id}>
                  <p className="text-lg">{comment.content}</p>
                  <div className="text flex justify-between items-center font-mont text-[10px]">
                    <h1 className="">{comment.author.name}</h1>

                    <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              <textarea
                name="com"
                id="com"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="write a comment"
                className="border-b outline-none"
              ></textarea>
              <button
                type="submit"
                className="bg-green-800 mt-5 text-amber-50 py-2 px-5 rounded-4xl"
                onClick={createComment}
              >
                comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
