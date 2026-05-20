import mongoose, { Schema } from "mongoose"
import { IUser } from "../types/interfaces"

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model<IUser>("User", userSchema)

export default User