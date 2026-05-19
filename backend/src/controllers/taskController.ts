import { Request, Response } from "express"
import asyncHandler from "express-async-handler"

import Task from "../models/Task"

import { CreateTaskBody, UpdateTaskBody } from "../types/interfaces"

export const createTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, status } = req.body as CreateTaskBody

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user?._id
    })

    res.status(201).json(task)
  }
)

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search?.toString() || ""

    const sort = req.query.sort?.toString() || "latest-created"

    const status = req.query.status?.toString()

    const query: any = {
      user: req.user?._id,
      title: {
        $regex: search,
        $options: "i"
      }
    }

    if (status) {
      query.status = status
    }

    let sortOption = {}

    switch (sort) {
      case "oldest-created":
        sortOption = { createdAt: 1 }
        break

      case "latest-updated":
        sortOption = { updatedAt: -1 }
        break

      case "oldest-updated":
        sortOption = { updatedAt: 1 }
        break

      default:
        sortOption = { createdAt: -1 }
    }

    const tasks = await Task.find(query).sort(sortOption)

    res.json(tasks)
  }
)

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user?._id
    })

    // const task = await Task.findById(req.params.id)

    if (!task) {
      res.status(404)
      throw new Error("Task not found")
    }

    res.json(task)
  }
)

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const updates = req.body as UpdateTaskBody

    const updatedTask = await Task.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user?._id
        },
        updates,
        {
          new: true,
          runValidators: true
        }
      )

    if (!updatedTask) {
      res.status(404)
      throw new Error("Task not found")
    }

    res.json(updatedTask)
  }
)

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user?._id
    })

    // const deletedTask = await Task.findByIdAndDelete(req.params.id)

    if (!deletedTask) {
      res.status(404)
      throw new Error("Task not found")
    }

    res.json({
      message: "Task deleted successfully"
    })
  }
)