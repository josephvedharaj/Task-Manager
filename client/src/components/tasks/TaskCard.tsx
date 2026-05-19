import type {
  Task
} from "../../types/interfaces"

interface TaskCardProps {
  task: Task
  onDelete: (
    taskId: string
  ) => void
  onEdit: (
    task: Task
  ) => void
}

const TaskCard = ({
  task,
  onDelete,
  onEdit
}: TaskCardProps) => {

  return (

    <div className="
      bg-white
      p-5
      rounded-xl
      shadow
      flex
      flex-col
    ">

      <h3 className="
        text-lg
        font-bold
      ">
        {task.title}
      </h3>

      <p className="
        text-gray-600
        mt-2
        whitespace-pre-wrap
      ">
        {task.description}
      </p>

      <div className="
        mt-auto
      ">

        <span className="
          inline-block
          mt-4
          text-sm
          bg-gray-200
          px-3
          py-1
          rounded-full
        ">
          {task.status}
        </span>

        <div className="
          flex
          gap-2
          mt-4
        ">

          <button
            onClick={() =>
              onEdit(task)
            }
            className="
              bg-blue-500
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Edit
          </button>

          <button
            onClick={() =>
              onDelete(task._id)
            }
            className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  )
}

export default TaskCard