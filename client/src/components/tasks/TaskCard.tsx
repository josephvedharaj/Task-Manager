import type { TaskCardProps } from "../../types/interfaces"

const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
  const deadlineDate = new Date(task.deadline)
  const today = new Date()
  const differenceInMs = deadlineDate.getTime() - today.getTime()
  const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24))

  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col hover:shadow-lg hover:scale-102 transition-all duration-300">
      <h3 className="text-lg font-bold">{task.title}</h3>

      <p className="text-gray-600 mt-2 whitespace-pre-wrap">{task.description}</p>

      <div className="mt-auto">
        <span className={`inline-block mt-4 mr-1 text-sm px-3 py-1 rounded-full text-gray
          ${task.status === "completed" ? "bg-green-200" : (task.status === "in-progress" ? "bg-yellow-200" : "bg-red-200")}
        `}>
          {task.status}
        </span>

        {task.status !== "completed" && (
          <span className="inline-block mt-4 text-sm bg-orange-300 px-3 py-1 rounded-full">
            {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
          </span>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(task)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard