import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { userRouter } from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()

app.use(express.json())
app.use(cors())
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    console.log("API working")
})

app.listen(port,(req,res)=>{
    console.log(`Server running on port : ${port}`)
})