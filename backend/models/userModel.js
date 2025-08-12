import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        enum: ['free','premium'],
        default: 'free'
    },
    dailySummaryCount: {
        type: Number,
        default: 0
    },
    dailySummaryCountDate: {
        type: Date,
        default: null
    }
},{timestamps:true})

const userModel = mongoose.model('user',userSchema)

export default userModel
