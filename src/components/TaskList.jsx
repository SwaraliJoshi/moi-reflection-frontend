import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("/api/tasks")
      .then(res => setTasks(res.data))
      .catch(console.error);
  }, []);

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex justify-between items-center p-4 border rounded-lg shadow-sm ${
            task.completed ? "bg-green-100" : "bg-yellow-100"
          }`}
        >
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <Link
                to={`/edit/${task.id}`}
                className="ml-4 text-sm text-pink-600 hover:underline"
              >
                ✏️ Edit
              </Link>
            </div>
            <p className="text-sm text-gray-600">{task.description}</p>
            {task.dueDate && (
              <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            )}
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
          <span className="text-2xl ml-4">{task.completed ? "✅" : "⌛"}</span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;