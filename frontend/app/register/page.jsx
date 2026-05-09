"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import API from "../../utils/api.jsx"

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post(
        "/auth/register",
        form
      )

      localStorage.setItem(
        "token",
        res.data.token
      )

      localStorage.setItem(
        "role",
        res.data.role
      )

      if (res.data.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/user")
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border w-full p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="border w-full p-3 mb-5 rounded"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-black text-white w-full py-3 rounded-lg">
          Register
        </button>

        <p className="mt-5 text-center">
          Already have an account?
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 cursor-pointer ml-2"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}