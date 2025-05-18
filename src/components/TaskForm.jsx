import { useState } from "react";
import axios from "axios";

function TaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    tags: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map(tag => tag.trim())
    };
    await axios.post("/api/tasks", payload);
    setForm({ title: "", description: "", dueDate: "", tags: "" });
    alert("Task added!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" type="text" placeholder="Title" required className="w-full p-2 border rounded" value={form.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" className="w-full p-2 border rounded" value={form.description} onChange={handleChange} />
      <input name="dueDate" type="date" className="w-full p-2 border rounded" value={form.dueDate} onChange={handleChange} />
      <input name="tags" type="text" placeholder="Comma-separated tags" className="w-full p-2 border rounded" value={form.tags} onChange={handleChange} />
      <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
}

export default TaskForm;