import type { DeleteModalProps } from "../../types/interfaces"

const DeleteModal = ({ isOpen, onClose, onConfirm }: DeleteModalProps) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-3">Delete Task</h2>

        <p className="text-gray-600 mb-6">Are you sure you want to delete this task?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 hover:text-black transition-all duration-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal