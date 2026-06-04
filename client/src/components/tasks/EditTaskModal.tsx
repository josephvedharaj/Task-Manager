import { useState, useEffect } from "react"
import type { ChangeEvent } from "react"
import toast from "react-hot-toast"

import api from "../../api/axios"

import type { Task, UpdateTaskData, EditTaskModalProps, CreateTaskData } from "../../types/interfaces"

const EditTaskModal = ({ task, isOpen, onClose, onUpdate }: EditTaskModalProps) => {
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    deadline: false
  })

  const [formData, setFormData] = useState<UpdateTaskData>({
    title: task.title,
    description: task.description,
    status: task.status,
    deadline: new Date(task.deadline).toISOString().split("T")[0]
  })

  const today = new Date().toISOString().split("T")[0]

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    setFormData({
      title: task.title,
      description: task.description,
      deadline: new Date(task.deadline).toISOString().split("T")[0],
      status: task.status
    })
  }, [task])

  const handleUpdate = async () => {
    const newErrors = {
      title: !(formData as CreateTaskData).title.trim(),
      description: !(formData as CreateTaskData).description.trim(),
      deadline: !formData.deadline
    }

    setErrors(newErrors)

    if (newErrors.title || newErrors.description || newErrors.deadline) {
      return
    }

    try {
      setLoading(true)

      await api.put<Task>(`/tasks/${task._id}`, formData)

      onUpdate()

      toast.success("Task updated successfully")

      onClose()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update task")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-5">Edit Task</h2>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={40}
              className={`w-full border p-3 rounded-lg ${errors.title ? "border-red-500" : ""}`}
            />

            {errors.title && (<p className="text-red-500 text-sm mt-1">This field is required</p>)}
          </div>

          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={500}
              rows={6}
              className={`w-full border p-3 rounded-lg resize-none ${errors.description ? "border-red-500" : ""}`}
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

          <div className="flex items-center gap-6 flex-wrap border rounded-lg p-3">
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

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="radio"
                name="status"
                value="completed"
                checked={formData.status === "completed"}
                onChange={handleChange}
              />
              Completed
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
          >

            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTaskModal