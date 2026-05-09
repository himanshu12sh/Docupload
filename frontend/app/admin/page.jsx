"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Navbar from "../../components/Navbar.jsx"
import API from "../../utils/api.jsx"

export default function AdminPage() {
  const [files, setFiles] = useState([])

  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("role")

    if (role !== "admin") {
      router.push("/login")
    } else {
      fetchFiles()
    }
  }, [])

  const fetchFiles = async () => {
    try {
      const res = await API.get(
        "/files/all"
      )

      setFiles(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8">
          Uploaded Documents
        </h1>

        <div className="grid grid-cols-3 gap-5">
          {files.map((file) => (
            <div
              key={file._id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h2 className="font-bold text-lg mb-2">
                {file.filename}
              </h2>

              <p className="mb-4 text-gray-600">
                {file.uploadedBy?.email}
              </p>

              <a
                href={`http://localhost:5000/${file.filepath}`}
                target="_blank"
                className="bg-black text-white px-5 py-2 rounded-lg inline-block"
              >
                Preview
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}