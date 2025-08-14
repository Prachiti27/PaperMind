import multer from "multer"
import path from "path"
import cloudinary from "./cloudinary.js"

// Temporary storage before sending to Cloudinary
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (ext === ".pdf") cb(null, true)
  else cb(new Error("Only PDF files are allowed"))
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter
})

// Middleware to upload file buffer to Cloudinary
export const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" })

    const result = await cloudinary.uploader.upload_stream({
      resource_type: "raw",
      folder: "papermind_files"
    }, (error, result) => {
      if (error) return next(error)
      req.file.cloudinaryUrl = result.secure_url
      next()
    })

    result.end(req.file.buffer)
  } catch (error) {
    console.error("Cloudinary Upload Error:", error)
    res.status(500).json({ success: false, message: "Failed to upload file" })
  }
}

export default upload
