import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TaskEditor() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", description: "", completed: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        if (id) {
            axios.get(`/api/tasks/${id}`)
            .then(res => {
                console.log("Loaded task data:", res.data);
                setForm({
                  title: res.data.title || "",
                  description: res.data.description || "",
                  dueDate: res.data.dueDate ? res.data.dueDate.slice(0, 10) : "",
                  status: res.data.status || "New",
                  tags: res.data.tags || []
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch task:", err);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;
    await axios.put(`/api/tasks/${id}`, { ...form, tags: form.tags?.filter(Boolean), });
    alert("Task updated!");
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!id) return <p className="text-center text-gray-500">No task selected. Please use the edit page with a task ID.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
      <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" />
      {/* <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="w-full p-2 border rounded" required /> */}

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        disabled
        className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
      />
      
      <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <input
        type="text"
        name="tags"
        placeholder="Comma-separated tags"
        value={form.tags.join(", ")}
        onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map(tag => tag.trim()) })}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">Update Task</button>
    </form>
  );
}

export default TaskEditor;