import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import ProtectedRoute from "./routes/ProtectedRoute"
import EditProfilePage from "./pages/EditProfilePage"
import AddTaskPage from "./pages/CreateTaskPage"

import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/tasks/create"
          element={
            <ProtectedRoute>
              <AddTaskPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App