import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { userRouter } from './routes/userRoute.js'
import summaryRouter from './routes/summaryRoute.js'
import paymentRouter from './routes/paymentRoute.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()

app.use(express.json())
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/api',userRouter)
app.use('/api',summaryRouter)
app.use('/api',paymentRouter)

app.get('/',(req,res)=>{
    console.log("API working")
})

app.listen(port,(req,res)=>{
    console.log(`Server running on port : ${port}`)
})

export default app