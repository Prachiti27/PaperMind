import fs from 'fs'
import path from 'path'
import PDFParser from 'pdf2json'
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
})

function extractText(filePath) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            return reject(new Error(`File not found at path: ${filePath}`))
        }

        if (path.extname(filePath).toLowerCase() !== '.pdf') {
            return reject(new Error("Only PDF files are supported."))
        }

        const pdfParser = new PDFParser()

        pdfParser.on("pdfParser_dataError", errData => {
            reject(new Error(errData.parserError))
        })

        pdfParser.on("pdfParser_dataReady", pdfData => {
            try {
                let rawText = ""
                pdfData.Pages.forEach(page => {
                    page.Texts.forEach(textItem => {
                        rawText += decodeURIComponent(textItem.R.map(r => r.T).join('')) + " ";
                    })
                })
                resolve(rawText.trim())
            } catch (e) {
                reject(new Error("Failed to extract text from PDF structure."))
            }
        })

        pdfParser.loadPDF(filePath)
    })
}

export async function generateSummary(filePath) {
    try {
        const fileText = await extractText(filePath)

        const prompt = `
You are an expert research paper summarizer.
Based on the following content, extract the required information.
Paper content: ${fileText}
        `

        const maxRetries = 3

        for (let i = 0; i < maxRetries; i++) {
            try {
                const result = await model.generateContent({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: "OBJECT",
                            properties: {
                                title: { type: "STRING" },
                                authors: { type: "ARRAY", items: { type: "STRING" } },
                                yearOfPublication: { type: "STRING" },
                                abstract: { type: "STRING" },
                                methodology: { type: "STRING" },
                            },
                            required: ["title", "authors", "yearOfPublication", "abstract", "methodology"]
                        },
                    },
                })

                const structuredSummary = JSON.parse(result.response.text())
                return structuredSummary

            } catch (err) {
                if (err.status === 503 && i < maxRetries - 1) {
                    console.log(`AI model overloaded. Retrying ${i + 1}/${maxRetries}...`)
                    await new Promise(r => setTimeout(r, 3000 * (i + 1)))
                } else {
                    throw err
                }
            }
        }

        throw new Error("AI service unavailable after multiple retries.")

    } catch (error) {
        console.error("Error generating summary:", error)
        throw new Error(error.message || "Failed to get summary from the AI model.")
    }
}
