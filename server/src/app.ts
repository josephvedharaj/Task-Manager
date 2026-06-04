import express from "express"
import cors from "cors"
import path from "path"

import authRoutes from "./routes/authRoutes"
import taskRoutes from "./routes/taskRoutes"
import userRoutes from "./routes/userRoutes"

import errorHandler from "./middleware/errorMiddleware"
import notFound from "./middleware/notFoundMiddleware"

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",

    "https://task-manager-omega-nine-74.vercel.app",
    "https://task-manager-git-main-josephvedharajs-projects.vercel.app",
    "https://task-manager-192g9hudm-josephvedharajs-projects.vercel.app"
  ],
  credentials: true
}))

app.use(express.json())

app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.get("/", (req, res) => {
  res.send("Task Manager API Running...")
})

app.use("/api/auth", authRoutes)

app.use("/api/tasks", taskRoutes)

app.use("/api/user/", userRoutes)

app.use(notFound)

app.use(errorHandler)

export default app