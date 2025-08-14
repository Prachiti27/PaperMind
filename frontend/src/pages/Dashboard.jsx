import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import ShopContext from "../context/ShopContext"

const Dashboard = () => {
  const { user, setUser } = useContext(ShopContext)
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSummary, setSelectedSummary] = useState(null)
  const navigate = useNavigate()

  const fetchSummaries = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/all-summaries`, { withCredentials: true })
      setSummaries(Array.isArray(data.summaries) ? data.summaries : [])
      setLoading(false)
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch summaries")
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-summary/${id}`, { withCredentials: true })
      toast.success("Summary deleted successfully")
      setSummaries(summaries.filter((summary) => summary._id !== id))
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete summary")
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
    navigate("/login")
  }

  useEffect(() => {
    fetchSummaries()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#4F46E5]/20 to-white">
        <p className="text-[#4F46E5] font-semibold text-lg">Loading summaries...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4F46E5]/10 to-white p-6">
      <div className="flex justify-between items-center mb-8">
        <span className="text-2xl font-bold text-[#4F46E5]">PaperMind</span>
        <button
          onClick={handleLogout}
          className="bg-[#4F46E5] text-white px-5 py-2 rounded-lg shadow hover:bg-[#3f3abf] transition"
        >
          Logout
        </button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#4F46E5]">Your Summaries</h1>
        <p className="text-[#4F46E5]/70 mt-2">Access all the AI-generated paper summaries here</p>
      </div>

      {summaries.length === 0 ? (
        <p className="text-center text-[#4F46E5]/60 font-medium mt-20">No summaries found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map((summary) => (
            <div
              key={summary._id}
              className="bg-white rounded-2xl shadow-lg p-6 transition-transform hover:scale-105 cursor-pointer border border-[#4F46E5]/20"
              onClick={() => setSelectedSummary(summary)}
            >
              <h2 className="text-xl font-semibold text-[#4F46E5] mb-3">{summary.title}</h2>
              <p className="text-gray-700 mb-4 whitespace-pre-line">{summary.abstract?.slice(0, 100)}...</p>
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(summary._id)
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto p-4">
          <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] relative overflow-y-auto">
            <button
              onClick={() => setSelectedSummary(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#4F46E5] mb-4">{selectedSummary.title}</h2>
            <p className="mb-2"><strong>Authors:</strong> {selectedSummary.authors?.join(", ") || "N/A"}</p>
            <p className="mb-2"><strong>Year:</strong> {selectedSummary.yearOfPublication || "N/A"}</p>
            <p className="mb-2"><strong>Abstract:</strong></p>
            <p className="mb-4 whitespace-pre-line">{selectedSummary.abstract || "N/A"}</p>
            <p className="mb-2"><strong>Methodology:</strong></p>
            <p className="whitespace-pre-line">{selectedSummary.methodology || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
