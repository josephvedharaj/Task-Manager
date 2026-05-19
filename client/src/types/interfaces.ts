export interface User {
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
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
  user: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskData {
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
}

export interface UpdateTaskData {
  title?: string
  description?: string
  status?: "pending" | "in-progress" | "completed"
}