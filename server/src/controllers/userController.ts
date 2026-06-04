import fs from "fs"
import path from "path"

import { Request, Response } from "express"

import asyncHandler from "express-async-handler"

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user

  if (!user) {
    res.status(404)

    throw new Error("User not found")
  }

  const errors: Record<string, string> = {}

  const name = req.body.name?.trim()

  const phoneNumber = req.body.phoneNumber?.trim()

  if (!name) {
    errors.name = "Name is required"
  } else if (!/^[A-Za-z ]+$/.test(name)) {
    errors.name = "Name should contain only letters"
  }

  if (phoneNumber) {
    if (!/^[0-9]+$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number should only contain numbers"
    } else if (
      phoneNumber.length !== 10
    ) {
      errors.phoneNumber = "Phone number must be exactly 10 digits"
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(400)
    res.json({ errors })

    return
  }

  user.name = name
  user.gender = req.body.gender || user.gender
  user.phoneNumber = phoneNumber || ""
  user.dob = req.body.dob || null

  const defaultProfileImage = "/uploads/defaultProfileImage.webp"

  if (req.body.removeProfileImage === "true") {
    if (user.profileImage !== defaultProfileImage) {
      const oldImagePath = path.join(process.cwd(), user.profileImage)

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath)
      }
    }

    user.profileImage = defaultProfileImage
  }

  if (req.file) {
    if (user.profileImage !== defaultProfileImage) {
      const oldImagePath = path.join(process.cwd(), user.profileImage)

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath)
      }
    }

    user.profileImage = `/uploads/${req.file.filename}`
  }

  const updatedUser = await user.save()

  res.json(updatedUser)
})