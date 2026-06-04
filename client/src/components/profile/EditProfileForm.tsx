import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import toast from "react-hot-toast"

import api from "../../api/axios"
import { useAuth } from "../../context/AuthContext"

import type { EditProfileFormProps } from "../../types/interfaces"

const EditProfileForm = ({ onProfileEdited }: EditProfileFormProps) => {
  const { user, updateUser } = useAuth()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    gender: user?.gender || "prefer not to say",
    phoneNumber: user?.phoneNumber || "",
    dob: user?.dob ? new Date(user.dob).toISOString().split("T")[0] : ""
  })

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    profileImage: ""
  })

  const [profileImage, setProfileImage] = useState<File | null>(null)

  const [removeProfileImage, setRemoveProfileImage] = useState(false)

  const [loading, setLoading] = useState(false)
  
  const today = new Date().toISOString().split("T")[0]

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setErrors({
      name: "",
      phoneNumber: "",
      profileImage: ""
    })

    try {
      setLoading(true)

      const data = new FormData()

      data.append("name", formData.name)
      data.append("gender", formData.gender)
      data.append("phoneNumber", formData.phoneNumber)
      data.append("dob", formData.dob)
      data.append("removeProfileImage", String(removeProfileImage))

      if (profileImage) {
        data.append("profileImage", profileImage)
      }

      const response = await api.put("/user/profile", data)

      updateUser(response.data)

      onProfileEdited()

      toast.success("Profile updated successfully")
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors({
          name: error.response.data.errors.name || "",
          phoneNumber: error.response.data.errors.phoneNumber || "",
          profileImage: ""
        })
      } else {
        toast.error(error.response?.data?.message || "Failed to update profile")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow space-y-4 mb-6"
    >
      <div className="flex justify-center">
        <img
          src={removeProfileImage ? `${import.meta.env.VITE_API_URL?.replace("/api", "")}/uploads/defaultProfileImage.webp` : (profileImage ? URL.createObjectURL(profileImage) : `${import.meta.env.VITE_API_URL?.replace("/api", "")}${user?.profileImage}`)}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow"
        />
      </div>

      <div className="flex gap-3">
        <label
          className="flex-1 border p-3 rounded-lg cursor-pointer text-center hover:bg-gray-100 transition-all duration-300"
        >
          Choose a Profile Photo

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0]

              if (!file) {
                return
              }

              if (!file.type.startsWith("image/")) {
                setErrors((prev) => ({
                  ...prev,
                  profileImage: "Only image files are allowed"
                }))

                setProfileImage(null)

                return
              }

              setErrors((prev) => ({
                ...prev,
                profileImage: ""
              }))

              setProfileImage(file)

              setRemoveProfileImage(false)
            }}
          />
        </label>

        <button
          type="button"
          onClick={() => {
            setProfileImage(null)

            setRemoveProfileImage(true)

            setErrors((prev) => ({
              ...prev,
              profileImage: ""
            }))
          }}
          className="bg-gray-300 px-4 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
        >
          Remove Photo
        </button>
      </div>

      {errors.profileImage && (<p className="text-red-500 text-sm mt-1">{errors.profileImage}</p>)}

      <div>
        <label className="block mb-2 font-medium">
          Name<span className="text-red-500">{" "}*</span>
        </label>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full border p-3 rounded-lg ${errors.name ? "border-red-500" : ""}`}
        />

        {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name}</p>)}
      </div>

      <div>
        <label className="block mb-2 font-medium">Phone Number</label>

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`w-full border p-3 rounded-lg ${errors.phoneNumber ? "border-red-500" : ""}`}
        />

        {errors.phoneNumber && (<p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>)}
      </div>

      <div>
        <label className="blockmb-2 font-medium">Date of Birth</label>

        <input
          type="date"
          name="dob"
          max={today}
          value={formData.dob}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Gender</label>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
          <option value="prefer not to say">Prefer not to say</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-300 hover:text-black transition-all duration-300"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  )
}

export default EditProfileForm