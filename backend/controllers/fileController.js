import File from "../models/File.js"

export const uploadFile = async (req, res) => {
  try {
    const file = await File.create({
      filename: req.file.filename,
      filepath: req.file.path,
      uploadedBy: req.user.id,
    })

    res.status(201).json(file)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const getAllFiles = async (req, res) => {
  try {
    const files = await File.find().populate(
      "uploadedBy",
      "name email"
    )

    res.json(files)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}