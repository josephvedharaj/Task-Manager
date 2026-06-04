export interface User {
  _id: string
  name: string
  email: string
  profileImage: string
  gender: string
  dob: Date
  phoneNumber: string
  createdAt: string
  updatedAt: string
}

export interface AuthContextType {
  user: User | null
  updateUser: (data: User) => void
  loading: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

export interface AuthResponse {
  _id: string
  name: string
  email: string
  token: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  deadline: Date
  user: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskData {
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  deadline: string
}

export interface UpdateTaskData {
  title?: string
  description?: string
  status?: "pending" | "in-progress" | "completed"
  deadline: string
}

export interface EditTaskModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

export interface TaskCardProps {
  task: Task
  onDelete: (taskId: string) => void
  onEdit: (task: Task) => void
}

export interface TaskFormProps {
  onTaskCreated: () => void
}

export interface EditProfileFormProps {
  onProfileEdited: () => void
}

export interface DeleteModalProps {
  onClose: () => void
  onConfirm: () => void
}

export interface SpinnerProps {
  fullScreen?: boolean
}

