import express from "express"

import protect from "../middleware/authMiddleware"
import { updateProfile } from "../controllers/userController"
import upload from "../middleware/multerMiddleware"

const router = express.Router()

router.put("/profile", protect, upload.single("profileImage"), updateProfile)

export default router