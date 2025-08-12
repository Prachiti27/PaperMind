import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

function createToken(user){
    return jwt.sign({id: user._id, email:user.email},process.env.JWT_SECRET,{expiresIn:'1d'})
}

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already registered' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            plan: 'free',
            dailySummaryCount: 0,
            dailySummaryCountDate: null
        })

        await newUser.save()

        res.json({success:true,message:'User registered successfully'})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:'Server error'})
    }
}

const login = async(req,res) => {
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({success:false,message:'Email and password are required'})
        }

        const user = await userModel.findOne({ email })

        if(!user){
            return res.status(401).json({success:false,message:'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({success:false,message:'Invalid credentials'})
        }

        const token = createToken(user)

        res.cookie('authToken',token,{
            httpOnly: true,
            signed: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24*60*60*1000,
            sameSite: 'strict'
        })

        res.json({success:true,message:'Logged in successfully'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:'Server error'})
    }
}

const logout = async(req,res) => {
    res.clearCookie('authToken')
    res.json({success:true,message:'Logged out successfully'})
}

export {signUp, login, logout}