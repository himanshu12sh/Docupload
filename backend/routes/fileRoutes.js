import express from "express"
import multer from "multer"
import path from "path"

import {
  uploadFile,
  getAllFiles,
} from "../controllers/fileController.js"

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js"

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({ storage })

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadFile
)

router.get(
  "/all",
  protect,
  adminOnly,
  getAllFiles
)

export default router