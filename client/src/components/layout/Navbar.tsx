import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../context/AuthContext"

const Navbar = () => {

  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">

        <img
          src={`${import.meta.env.VITE_API_URL?.replace("/api", "")}${user?.profileImage}`}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover border"
        />

        <div>
          <h1 className="text-2xl font-bold">Task Manager</h1>

          <p className="text-gray-500 text-sm">Welcome, {user?.name}</p>
        </div>
      </div>

      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)}
          className="w-14 h-16 pb-1 rounded-xl text-black text-3xl font-bold flex items-center justify-center hover:scale-105 rotate-90 transition-all duration-300"
        >
          |||
        </button>

        {
          showMenu && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
              <button
                onClick={() => {
                  navigate("/edit-profile")
                  setShowMenu(false)
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-all duration-300"
              >
                Edit Profile
              </button>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )
        }
      </div>
    </header>
  )
}

export default Navbar