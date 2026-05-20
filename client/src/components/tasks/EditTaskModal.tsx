import { useState, useEffect } from "react"
import type { ChangeEvent } from "react"

import toast from "react-hot-toast"

import api from "../../api/axios"

import type { Task, UpdateTaskData, EditTaskModalProps } from "../../types/interfaces"

const EditTaskModal = ({ task, isOpen, onClose, onUpdate }: EditTaskModalProps) => {
  const [loading, setLoading] = useState(false)
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
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength={40}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
            rows={6}
            className="w-full border p-3 rounded-lg resize-none"
          />

          <input
            type="date" 
            name="deadline"
            min={today}
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
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
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTaskModal