import mongoose, { Schema } from "mongoose"
import { ITask } from "../types/interfaces"

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 40
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },

  {
    timestamps: true
  }
)

const Task = mongoose.model<ITask>("Task", taskSchema)

export default Task