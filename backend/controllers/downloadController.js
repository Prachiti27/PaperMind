import PDFDocument from 'pdfkit'
import summaryModel from '../models/summarySchema.js'

const downloadDoc = async (req, res) => {
    try {
        const summary = await summaryModel.findOne({
            _id: req.params.id,
            userId: req.user.id
        })

        if (!summary) {
            return res.status(404).json({ success: false, message: "Summary not found" })
        }

        res.setHeader("Content-Disposition", `attachment; filename=summary-${summary._id}.pdf`)
        res.setHeader("Content-Type", "application/pdf")

        const doc = new PDFDocument()
        doc.pipe(res)

        doc.fontSize(20).text("Paper Summary", { align: "center" })
        doc.moveDown()

        doc.fontSize(16).text(`Title:`, { underline: true })
        doc.fontSize(14).text(summary.title || "Untitled")
        doc.moveDown()

        doc.fontSize(16).text(`Authors:`, { underline: true })
        doc.fontSize(14).text(summary.authors?.join(", ") || "Unknown")
        doc.moveDown()

        doc.fontSize(16).text(`Year of Publication:`, { underline: true })
        doc.fontSize(14).text(summary.yearOfPublication || "N/A")
        doc.moveDown()

        doc.fontSize(16).text(`Abstract:`, { underline: true })
        doc.fontSize(12).text(summary.abstract || "No abstract available")
        doc.moveDown()

        doc.fontSize(16).text(`Methodology:`, { underline: true })
        doc.fontSize(12).text(summary.methodology || "No methodology available")

        doc.end()
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export { downloadDoc }