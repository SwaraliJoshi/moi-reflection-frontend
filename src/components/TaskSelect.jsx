import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TaskSelect() {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/tasks").then(res => setTasks(res.data));
  }, []);

  const handleChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    if (id) navigate(`/edit/${id}`);
  };

  return (
    <div className="space-y-4">
      <label htmlFor="task" className="block text-lg font-medium text-gray-700">
        Select a task to edit:
      </label>
      <select
        id="task"
        value={selectedId}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Choose Task --</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TaskSelect;