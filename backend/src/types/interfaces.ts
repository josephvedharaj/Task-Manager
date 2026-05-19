import { Document, Types } from "mongoose"

type status = "pending" | "in-progress" | "completed"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface ITask extends Document {
  title: string
  description: string
  status: status
  user: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface RegisterBody {
  name: string
  email: string
  password: string
}

export interface LoginBody {
    email: string
    password: string
}

export interface CreateTaskBody {
  title: string
  description: string
  status?: status
}

export interface UpdateTaskBody {
  title?: string
  description?: string
  status?: status
}

export interface JwtPayload {
  id: string
}