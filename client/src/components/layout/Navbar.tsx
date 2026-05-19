import { useAuth } from "../../context/AuthContext"

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Task Manager</h1>

        <p className="text-gray-500 text-sm">Welcome, {user?.name}</p>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={logout} className="bg-black text-white px-4 py-2 rounded-lg">Logout</button>
      </div>
    </header>
  )
}

export default Navbar