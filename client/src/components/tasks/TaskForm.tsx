import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import toast from "react-hot-toast"

import api from "../../api/axios"

import type { CreateTaskData, Task, TaskFormProps } from "../../types/interfaces"

const TaskForm = ({ onTaskCreated }: TaskFormProps) => {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    status: "pending",
    deadline: ""
  })

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    deadline: false
  })

  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const newErrors = {
      title: !formData.title.trim(),
      description: !formData.description.trim(),
      deadline: !formData.deadline
    }

    setErrors(newErrors)

    if (newErrors.title || newErrors.description || newErrors.deadline) {
      return
    }

    try {
      setLoading(true)

      await api.post<Task>("/tasks", formData)

      onTaskCreated()

      setFormData({
        title: "",
        description: "",
        status: "pending",
        deadline: ""
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
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          maxLength={40}
          onChange={handleChange}
          className={`w-full border p-3 rounded-lg outline-none ${errors.title ? "border-red-500" : ""}`}
        />

        {errors.title && (<p className="text-red-500 text-sm mt-1">This field is required</p>)}
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          maxLength={500}
          rows={6}
          onChange={handleChange}
          className={`w-full border p-3 rounded-lg h-32 resize-none outline-none ${errors.description ? "border-red-500" : ""}`}
        />

        {errors.description && (<p className="text-red-500 text-sm mt-1">This field is required</p>)}
      </div>

      <div>
        <div className="flex items-center gap-3">
          <div className={`flex-1 border rounded-lg px-4 py-3 flex items-center justify-between ${errors.deadline ? "border-red-500" : ""}`}>
            <span className="text-gray-700 font-medium">Deadline</span>

            <input
              type="date"
              name="deadline"
              min={today}
              value={formData.deadline}
              onChange={handleChange}
              className="bg-transparent outline-none cursor-pointer"
            />
          </div>
        </div>

        {errors.deadline && (<p className="text-red-500 text-sm mt-1">This field is required</p>)}
      </div>

      <div className="flex items-center gap-6 border p-3 rounded-lg">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="status"
            value="pending"
            checked={formData.status === "pending"}
            onChange={handleChange}
          />
          Pending
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="status"
            value="in-progress"
            checked={formData.status === "in-progress"}
            onChange={handleChange}
          />
          In Progress
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
      >

        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  )
}

export default TaskForm