import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TaskList() {
  const [groupedTasks, setGroupedTasks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/tasks")
      .then(res => groupByDueDate(res.data))
      .catch(console.error);
  }, []);

  const groupByDueDate = (tasks) => {
    const grouped = {};
    tasks.forEach(task => {
      const dateKey = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date";
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(task);
    });
    setGroupedTasks(grouped);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 hover:bg-green-200";
      case "In Progress":
        return "bg-yellow-100 hover:bg-yellow-200";
      case "Cancelled":
        return "bg-red-100 hover:bg-red-200";
      case "New":
      default:
        return "bg-blue-100 hover:bg-blue-200";
    }
  };

  const isDueToday = (dueDate) => {
    const today = new Date();
    const date = new Date(dueDate);
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <div className="space-y-4">
      {Object.entries(groupedTasks).sort((a, b) => new Date(b[0]) - new Date(a[0])).map(([date, tasks]) => (
        <div key={date}>
          <h3 className="text-lg font-bold text-gray-700 border-b mb-2 pb-1">Due: {date}</h3>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                onClick={() => navigate(`/edit/${task.id}`)}
                className={`flex justify-between items-center p-4 border rounded-lg shadow-sm cursor-pointer transition-colors ${getStatusColor(task.status)}`}
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                      {task.title}
                      {isDueToday(task.dueDate) && task.status !== "Done" && (
                        <span className="ml-2 text-red-600" title="Due Today!">⚠️</span>
                      )}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  {task.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {task.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-pink-200 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="ml-4 text-sm px-2 py-1 rounded bg-white text-gray-700 font-semibold border">
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TaskList;