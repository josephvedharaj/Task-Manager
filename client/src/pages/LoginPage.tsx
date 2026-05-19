import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import type { LoginData } from "../types/interfaces"

import { useAuth } from "../context/AuthContext"

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      await login(formData)
      navigate("/")
      toast.success("Logged in successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text--3xl font-bold text-center">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          {loading ? "Loging in..." : "Login"}
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "} <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage