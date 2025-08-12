import express from 'express'
import auth from '../middlewares/auth.js'
import upload from '../config/multer.js'
import { summary } from '../controllers/summaryController.js'

const summaryRouter = express.Router()

summaryRouter.post("/generate-summary",auth,upload.single("paper"),summary)

export default summaryRouter