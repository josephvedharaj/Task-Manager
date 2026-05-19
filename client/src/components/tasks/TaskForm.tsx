import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import toast from "react-hot-toast"

import api from "../../api/axios"

import type { CreateTaskData, Task } from "../../types/interfaces"

interface TaskFormProps {
  onTaskCreated: (task: Task) => void
}

const TaskForm = ({ onTaskCreated }: TaskFormProps) => {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    status: "pending"
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await api.post<Task>("/tasks", formData)

      onTaskCreated(response.data)

      setFormData({
        title: "",
        description: "",
        status: "pending"
      })

      toast.success("Task Added successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow space-y-4 mb-6"
    >

      <h2 className="text-xl font-bold">Add Task</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-32"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-5 py-3 rounded-lg"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  )
}

export default TaskForm