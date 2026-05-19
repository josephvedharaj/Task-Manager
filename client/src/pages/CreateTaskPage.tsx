import { useNavigate } from "react-router-dom"

import Navbar from "../components/layout/Navbar"
import TaskForm from "../components/tasks/TaskForm"

const CreateTaskPage = () => {
  const navigate = useNavigate()

 return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <main className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Create Task</h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>

        <TaskForm onTaskCreated={() => {navigate("/dashboard")}}/>
      </div>
    </main>
  </div>
)
}

export default CreateTaskPage