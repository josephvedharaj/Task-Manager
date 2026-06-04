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
    },

    profileImage: {
      type: String,
      default: "/uploads/defaultProfileImage.webp"
    },

    gender: {
      type: String,
      enum: [
        "male",
        "female",
        "others",
        "prefer not to say"
      ],
      default: "prefer not to say"
    },

    dob: {
      type: Date,
      default: null
    },

    phoneNumber: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model<IUser>(
  "User",
  userSchema
)

export default User