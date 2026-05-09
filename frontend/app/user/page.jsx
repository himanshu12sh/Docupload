"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, CheckCircle, XCircle, Loader2 } from "lucide-react"

import Navbar from "../../components/Navbar.jsx"
import API from "../../utils/api.jsx"

export default function UserPage() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("role")

    if (role !== "user") {
      router.push("/login")
    }
  }, [])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setUploadStatus(null)
    } else {
      alert("Please upload a PDF file")
    }
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setUploadStatus(null)
    } else if (selectedFile) {
      alert("Please upload a PDF file")
      e.target.value = ""
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file")
      return
    }

    setUploading(true)
    setUploadStatus(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      await API.post("/files/upload", formData)
      
      setUploadStatus({ type: "success", message: "File Uploaded Successfully!" })
      
      setTimeout(() => {
        setFile(null)
        setUploadStatus(null)
      }, 2000)
    } catch (error) {
      setUploadStatus({ 
        type: "error", 
        message: error.response?.data?.message || "Upload failed. Please try again." 
      })
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setUploadStatus(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Document Upload
            </h1>
            <p className="text-lg text-gray-600">
              Upload your PDF documents securely to our cloud storage
            </p>
          </div>

          {/* Main Upload Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              {/* Upload Area */}
              {!file ? (
                <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                    dragActive
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,application/pdf"
                    onChange={handleFileSelect}
                  />
                  
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Drag and drop your file here
                  </h3>
                  
                  <p className="text-gray-500 mb-4">
                    or click to browse
                  </p>
                  
                  <p className="text-sm text-gray-400">
                    Supported format: PDF (Max size: 10MB)
                  </p>
                  
                  <button
                    onClick={() => document.getElementById("file-upload").click()}
                    className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Select File
                  </button>
                </div>
              ) : (
                // File Preview Section
                <div className="border rounded-xl p-6 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-indigo-100 rounded-lg">
                        <FileText className="w-8 h-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {file.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={removeFile}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      disabled={uploading}
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Upload Button */}
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Upload Document</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {uploadStatus && (
                <div
                  className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${
                    uploadStatus.type === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {uploadStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <p
                    className={
                      uploadStatus.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }
                  >
                    {uploadStatus.message}
                  </p>
                </div>
              )}
            </div>
          </div>

       
        </div>
      </div>
    </div>
  )
}