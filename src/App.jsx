import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEditor from "./components/TaskEditor";
import TaskSelect from "./components/TaskSelect";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
          <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Moi Reflection</h1>

          <nav className="flex justify-center mb-6 space-x-4">
            <Link to="/tasks" className="px-4 py-2 rounded bg-gray-200 hover:bg-pink-500 hover:text-white transition">View Tasks</Link>
            <Link to="/add" className="px-4 py-2 rounded bg-gray-200 hover:bg-pink-500 hover:text-white transition">Add Task</Link>
            <Link to="/edit" className="px-4 py-2 rounded bg-gray-200 hover:bg-pink-500 hover:text-white transition">Update Task</Link>
          </nav>

          <Routes>
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit" element={<TaskSelect />} />
            <Route path="/edit/:id" element={<TaskEditor />} />
            <Route path="/" element={<TaskList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;