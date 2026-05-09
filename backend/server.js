import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import fs from "fs"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import fileRoutes from "./routes/fileRoutes.js"

dotenv.config()

connectDB()

const app = express()

// Create uploads folder automatically on Render
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads")
}

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

app.use(express.json())

// Static folder
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/files", fileRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})