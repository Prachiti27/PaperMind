import mongoose from 'mongoose'

const summarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    authors: [String],
    yearOfPublication: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear()
    },
    abstract: {
        type: String
    },
    methodology: {
        type: String
    },
    originalFileUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const summaryModel = mongoose.model('summary', summarySchema)

export default summaryModel