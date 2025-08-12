import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'

const auth = async(req, res, next)=>{
    const token = req.signedCookies.authToken
    if(!token){
        return res.status(401).json({success:false, message:'Unauthirzed user'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        if(!user){
            return res.status(401).json({success:false,message:'User not found'})
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({success:false,message:error.message})
    }
}

export default auth