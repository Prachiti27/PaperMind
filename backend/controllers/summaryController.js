import summaryModel from "../models/summarySchema.js"
import userModel from "../models/userModel.js"
import { generateSummary } from "../service/aiService.js"

const createSummary = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const today = new Date().toISOString().split("T")[0]
        const userDate = user.dailySummaryCountDate
            ? user.dailySummaryCountDate.toISOString().split("T")[0]
            : null

        if (user.plan === "free") {
            if (userDate === today && user.dailySummaryCount >= 1) {
                return res.status(403).json({
                    success: false,
                    message: "Daily limit reached. Upgrade to premium for unlimited summaries."
                })
            }
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const filePath = req.file.path

        const aiResult = await generateSummary(filePath)

        const summary = await summaryModel.create({
            userId,
            title: aiResult.title,
            authors: aiResult.authors,
            yearOfPublication: aiResult.yearOfPublication,
            abstract: aiResult.abstract,
            methodology: aiResult.methodology,
            originalFileUrl: filePath
        })

        if (user.plan === 'free') {
            if (userDate != today) {
                user.dailySummaryCount = 1
                user.dailySummaryCountDate = new Date()
            }
            else {
                user.dailySummaryCount += 1
            }
            await user.save()
        }

        res.status(201).json({ success: true, message: "Summary saved", summary })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

const getAllSummaries = async (req, res) => {
    try {
        const summaries = await summaryModel.find({ userId: req.user.id }).sort({ createdAt: -1 })
        res.json({ success: true, summaries })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

const deleteSummary = async (req, res) => {
    try {
        const summary = await summaryModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!summary) {
            return res.status(404).json({ success: false, message: "Summary not found" })
        }

        res.json({ success: true, message: "Summary deleted successfully" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message:"Server error"})
    }
}

export { createSummary, getAllSummaries, deleteSummary }