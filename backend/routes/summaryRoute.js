import express from 'express'
import auth from '../middlewares/auth.js'
import upload from '../config/multer.js'
import { createSummary, deleteSummary, getAllSummaries } from '../controllers/summaryController.js'

const summaryRouter = express.Router()

summaryRouter.post("/generate-summary",auth,upload.single("paper"),createSummary)
summaryRouter.get("/all-summaries",auth,getAllSummaries)
summaryRouter.delete("/delete-summary/:id",auth,deleteSummary)

export default summaryRouter