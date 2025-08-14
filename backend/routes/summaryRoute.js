import express from "express"
import auth from "../middlewares/auth.js"
import upload, { uploadToCloudinary } from "../config/multer.js"
import { createSummary, getAllSummaries, deleteSummary } from "../controllers/summaryController.js"

const summaryRouter = express.Router()

summaryRouter.post("/generate-summary", auth, upload.single("paper"),uploadToCloudinary ,createSummary)
summaryRouter.get("/all-summaries", auth, getAllSummaries)
summaryRouter.delete("/delete-summary/:id", auth, deleteSummary)

export default summaryRouter
