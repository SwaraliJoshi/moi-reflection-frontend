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
                completed: res.data.completed || false,
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
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;
    await axios.put(`/api/tasks/${id}`, form);
    alert("Task updated!");
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!id) return <p className="text-center text-gray-500">No task selected. Please use the edit page with a task ID.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
      <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" />
      <label className="flex items-center gap-2">
        <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
        Completed
      </label>
      <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">Update Task</button>
    </form>
  );
}

export default TaskEditor;