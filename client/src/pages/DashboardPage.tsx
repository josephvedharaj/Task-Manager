import { useEffect, useState } from "react"
import type { ChangeEvent } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import api from "../api/axios"

import type { Task } from "../types/interfaces"

import Navbar from "../components/layout/Navbar"
import TaskCard from "../components/tasks/TaskCard"
import EditTaskModal from "../components/tasks/EditTaskModal"
import DeleteModal from "../components/ui/DeleteModal"
import Spinner from "../components/ui/Spinner"

const DashboardPage = () => {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sort, setSort] = useState("latest-created")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState("")

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setEditModalOpen(true)
  }

  const fetchTasks = async () => {
    try {
      setLoading(true)
      
      const response =await api.get<Task[]>("/tasks", {
        params: {
          search,
          status: statusFilter,
          sort
        }
      })

      setTasks(response.data)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [
    search,
    statusFilter,
    sort
  ])

  const handleDeleteTask = (taskId: string) => {
    setSelectedTaskId(taskId)
    setDeleteModalOpen(true)
  }

  const confirmDeleteTask = async () => {
    try {
      await api.delete(`/tasks/${selectedTaskId}`)

      setTasks((prev) =>
        prev.filter(
          (task) =>
            task._id !== selectedTaskId
        )
      )

      setDeleteModalOpen(false)
      toast.success("Task deleted successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete task")
    }
  }

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <main className="p-6">
        <div className="bg-white p-5 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            className="flex-1 border p-3 rounded-lg"
          />

          <select
            value={statusFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="in-progress">
              In Progress
            </option>

            <option value="completed">
              Completed
            </option>
          </select>

          <select
            value={sort}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="latest-created">
              Latest Created
            </option>

            <option value="oldest-created">
              Oldest Created
            </option>

            <option value="latest-updated">
              Latest Updated
            </option>

            <option value="oldest-updated">
              Oldest Updated
            </option>
          </select>

          <button
            onClick={() => navigate("/tasks/create")}
            className="bg-black text-white px-5 py-3 rounded-lg whitespace-nowrap"
          >
            Add Task
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>

        {!loading && tasks.length === 0 && (<p>No tasks found</p>)}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          }
        </div>
        {loading && (<Spinner />)}
      </main>

      {
        selectedTask && (
          <EditTaskModal
            task={selectedTask}
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onUpdate={handleUpdateTask}
          />
        )
      }

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteTask}
      />
    </div>
  )
}

export default DashboardPage