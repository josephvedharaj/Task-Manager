import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes"
import taskRoutes from "./routes/taskRoutes"

import errorHandler from "./middleware/errorMiddleware"
import notFound from "./middleware/notFoundMiddleware"

const app = express()

app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Task Manager API Running...")
})

app.use("/api/auth", authRoutes)

app.use("/api/tasks", taskRoutes)

app.use(notFound)

app.use(errorHandler)

export default app