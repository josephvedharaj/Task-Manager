import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"

import { RegisterBody, LoginBody } from "../types/interfaces"
import User from "../models/User"
import generateToken from "../utils/generateToken"

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body as RegisterBody
    
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString())
    })
  }
)

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginBody

    const user = await User.findOne({ email })

    if (!user) {
      res.status(401)
      throw new Error("Invalid credentials")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(401)
      throw new Error("Invalid credentials")
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString())
    })
  }
)

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    res.json(req.user)
  }
)