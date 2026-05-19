import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

import api from "../api/axios"

import type { User, LoginData, RegisterData, AuthResponse } from "../types/interfaces"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const login = async (data: LoginData) => {
    const response = await api.post<AuthResponse>("/auth/login", data)

    localStorage.setItem("token", response.data.token)

    await fetchUser()
  }

  const register = async (data: RegisterData) => {
    const response = await api.post<AuthResponse>("/auth/register", data)

    localStorage.setItem("token", response.data.token)

    await fetchUser()
  }

  const logout = () => {
    localStorage.removeItem("token")

    setUser(null)
    toast.success("Logged out successfully")
  }

  const fetchUser = async () => {
    try {
      const response = await api.get<User>("/auth/me")
      setUser(response.data)
    } catch {
      localStorage.removeItem("token")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    )
  }

  return context
}