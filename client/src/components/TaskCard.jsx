const TaskCard = ({ task, priority, onTaskClick }) => {
  const getBadgeClasses = (priority) => {
    if (priority === "HIGH") {
      return `bg-red-500 text-sm`;
    } else if (priority === "LOW") {
      return `text-green-800 text-sm`;
    } else {
      return `text-yellow-500 text-sm`;
    }
  };

  const dateCol = (task) => {
    if (new Date(task.dueDate) < new Date()) {
      return `text-red-500`;
    } else {
      return `text-black`;
    }
  };

  return (
    <div className="card border-b p-1 w-full" onClick={() => onTaskClick(task)}>
      <div className="head flex justify-between items-center">
        <h1 className="text-xl">{task.title}</h1>
        <div className={getBadgeClasses(priority)}>{priority}</div>
      </div>

      {task.dueDate && (
        <div className={dateCol(task)}>
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
      {task.assignedTo && (
        <div className="assignee">{task.assignedTo.name}</div>
      )}
      <div className="counts text-sm">{task._count.comments}</div>
    </div>
  );
};

export default TaskCard;
