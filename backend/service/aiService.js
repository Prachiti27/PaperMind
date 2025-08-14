import fetch from "node-fetch"
import PDFParser from "pdf2json"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest"
})

function extractTextFromBuffer(pdfBuffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser()
    pdfParser.on("pdfParser_dataError", errData => reject(new Error(errData.parserError)))
    pdfParser.on("pdfParser_dataReady", pdfData => {
      try {
        let rawText = ""
        pdfData.Pages.forEach(page => {
          page.Texts.forEach(textItem => {
            rawText += decodeURIComponent(textItem.R.map(r => r.T).join("")) + " "
          })
        })
        resolve(rawText.trim())
      } catch (e) {
        reject(new Error("Failed to extract text from PDF structure"))
      }
    })
    pdfParser.parseBuffer(pdfBuffer)
  })
}

export async function generateSummary(fileUrl) {
  try {
    const response = await fetch(fileUrl)
    if (!response.ok) throw new Error(`Failed to fetch PDF, status code: ${response.status}`)
    const pdfBuffer = Buffer.from(await response.arrayBuffer())
    const fileText = await extractTextFromBuffer(pdfBuffer)

    const prompt = `
You are an expert research paper summarizer
Based on the following content, extract the required information
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
                methodology: { type: "STRING" }
              },
              required: ["title", "authors", "yearOfPublication", "abstract", "methodology"]
            }
          }
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

    throw new Error("AI service unavailable after multiple retries")
  } catch (error) {
    console.error("Error generating summary:", error)
    throw new Error(error.message || "Failed to get summary from the AI model")
  }
}
