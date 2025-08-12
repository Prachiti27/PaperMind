import { login, logout, signUp } from "../controllers/userController.js"
import express from 'express'

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.post('/logout', logout)

export { userRouter }