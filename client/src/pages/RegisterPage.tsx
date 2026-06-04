import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import type { RegisterData } from "../types/interfaces"

import { useAuth } from "../context/AuthContext"

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      password: !formData.password.trim()
    }

    setErrors(newErrors)

    if (newErrors.name || newErrors.email || newErrors.password) {
      return
    }

    try {
      setLoading(true)

      await register(formData)

      navigate("/", {replace: true})

      toast.success("Account created successfully")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Account creation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border p-3 rounded-lg outline-none ${errors.name ? "border-red-500" : ""}`}
          />

          {errors.name && (<p className="text-red-500 text-sm mt-1">This field is required</p>)}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border p-3 rounded-lg outline-none ${errors.email ? "border-red-500" : ""}`}
          />

          {errors.email && (<p className="text-red-500 text-sm mt-1">This field is required</p>)}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border p-3 rounded-lg outline-none ${errors.password ? "border-red-500" : ""}`}
          />

          {errors.password && (<p className="text-red-500 text-sm mt-1">This field is required</p>)}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-300 hover:text-black transition-all duration-300"
        >

          {loading ? "Loading..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage