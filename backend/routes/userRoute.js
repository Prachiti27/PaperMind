import { getUser, login, logout, signUp } from "../controllers/userController.js"
import express from 'express'
import auth from "../middlewares/auth.js"

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.get('/user',auth,getUser)

export { userRouter }