"use client"

import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")

    router.push("/login")
  }

  return (
    <div className="bg-black text-white px-10 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">
        Document Manager
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 px-5 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  )
}