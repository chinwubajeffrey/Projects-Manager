import React, { useEffect, useState } from "react";
import API from "../api/axios";

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
        <div>Loading...</div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="card p-4 border">
            <h1 className="text-3xl">{task.title}</h1>
            <p className="priority">{task.priority}</p>
            {task.dueDate && <p className="date">{task.dueDate}</p>}

            <button
              className="bg-green-800 text-amber-50 py-2 px-5 rounded-4xl"
              onClick={onClose}
            >
              Close
            </button>
            <hr />
            <div className="comment">
              <h1>Comments</h1>
              {comments.map((comment) => (
                <div className="n" key={comment.id}>
                  <h1>{comment.author.name}</h1>
                  <p>{comment.content}</p>
                  <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
              <textarea
                name="com"
                id="com"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="wait"
              >
                write commeent
              </textarea>
              <button type="submit" onClick={createComment}>
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
