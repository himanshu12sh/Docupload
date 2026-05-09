import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import fileRoutes from "./routes/fileRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(cors())

app.use(express.json())

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
)

app.use("/api/auth", authRoutes)

app.use("/api/files", fileRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})