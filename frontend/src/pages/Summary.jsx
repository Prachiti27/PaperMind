import React, { useState } from "react"
import { FileDown, Upload } from "lucide-react"
import { jsPDF } from "jspdf"
import axios from "axios"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

const Summary = () => {
  const [file, setFile] = useState(null)
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      setFile(selectedFile)
    } else {
      alert("File size must be less than or equal to 10MB")
    }
  }



  const handleGenerateSummary = async () => {
    if (!file) return alert("Please upload a PDF file")
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("paper", file)

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/generate-summary`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      )

      if (res.data.success) {
        setSummary(res.data.summary)
        toast.success("Summary generated successfully")
      }
      else {
        toast.error(res.data.message || "Failed to generate summary")
      }
    }
    catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Server error")
    }
    finally {
      setLoading(false)
    }
  }


  const downloadPDF = () => {
    if (!summary) return
    const doc = new jsPDF()

    const pageWidth = 190
    let y = 20

    doc.setFont("helvetica", "bold")
  doc.setFontSize(16)
  const titleLines = doc.splitTextToSize(summary.title || "Title not available", pageWidth)
  doc.text(titleLines, 10, y)
  y += titleLines.length * 8 + 4

    doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  const authorsLine = `Authors: ${summary.authors ? summary.authors.join(", ") : "N/A"}`
  const authorsLines = doc.splitTextToSize(authorsLine, pageWidth)
  doc.text(authorsLines, 10, y)
  y += authorsLines.length * 8 + 6

    const yearLine = `Year: ${summary.yearOfPublication || "N/A"}`
  doc.text(yearLine, 10, y)
  y += 12

    doc.setFont("helvetica", "bold")
  doc.text("Abstract:", 10, y)
  y += 8

  doc.setFont("helvetica", "normal")
  const abstractLines = doc.splitTextToSize(summary.abstract || "N/A", pageWidth)
  doc.text(abstractLines, 10, y)
  y += abstractLines.length * 8 + 6

  doc.setFont("helvetica", "bold")
  doc.text("Methodology:", 10, y)
  y += 8

  doc.setFont("helvetica", "normal")
  const methodologyLines = doc.splitTextToSize(summary.methodology || "N/A", pageWidth)
  doc.text(methodologyLines, 10, y)

    doc.save("summary.pdf")
  }

 return (
  <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 relative">
    <div className="absolute top-4 right-4">
      <Link to="/dashboard" className="text-indigo-500 font-semibold hover:underline">
        Go to Dashboard
      </Link>
    </div>

    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl text-center">
      <h1 className="text-2xl font-bold mb-6">Generate Research Paper Summary</h1>

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-indigo-500 transition">
        <Upload className="w-8 h-8 text-indigo-500 mb-2" />
        <span className="text-gray-600">
          {file ? file.name : "Click to upload PDF (max 10MB)"}
        </span>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      <button
        onClick={handleGenerateSummary}
        disabled={loading}
        className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold mb-2">Generated Summary:</h2>
          <p className="bg-gray-100 p-3 rounded-lg whitespace-pre-line">
            Title: {summary.title || "N/A"}
            <br />
            Authors: {summary.authors || "N/A"}
            <br />
            Year: {summary.yearOfPublication || "N/A"}
            <br />
            Abstract: {summary.abstract || "N/A"}
            <br />
            Methodology: {summary.methodology || "N/A"}
          </p>

          <button
            onClick={downloadPDF}
            className="mt-4 flex items-center justify-center gap-2 bg-green-500 text-white w-full py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            <FileDown className="w-5 h-5" />
            Download Summary
          </button>
        </div>
      )}
    </div>
  </div>
)

}

export default Summary
