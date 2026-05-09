import mongoose from "mongoose"

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    },

    filepath: {
      type: String,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const File = mongoose.model("File", fileSchema)

export default File