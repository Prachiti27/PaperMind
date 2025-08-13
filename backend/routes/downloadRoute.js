import express from 'express'
import auth from '../middlewares/auth.js'
import { downloadDoc } from '../controllers/downloadController.js'

const downloadRouter = express.Router()

downloadRouter.get("/summary/:id/download",auth,downloadDoc)

export default downloadRouter