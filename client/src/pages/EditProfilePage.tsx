import { useNavigate } from "react-router-dom"

import Navbar from "../components/layout/Navbar"
import EditProfileForm from "../components/profile/EditProfileForm"

const EditProfilePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Edit Profile</h1>

            <button
              onClick={() => navigate("/", {replace: true})}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
          </div>

          <EditProfileForm onProfileEdited={() => {navigate("/", {replace: true})}}/>
        </div>
      </main>
    </div>
  )
}

export default EditProfilePage