import React, { type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Customer from "../pages/Customer"
import Login from "../pages/Login"
import Register from "../pages/Register"
import { useAuth } from "../hooks/useAuth"

// / -> Hopme page
// /register - > Register page
// /login -> Login page
// /customer -> Custome page

type RequreAuthTypes = {
  children: ReactNode
  roles?: string[]
}

const RequreAuth = ({ children, roles }: RequreAuthTypes) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={"/login"} replace />
  }

  if (roles && !roles.some((role) => user?.roles.includes(role))) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    )
  }

  return <>{children}</>
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequreAuth>
              <Home />
            </RequreAuth>
          }
        />
        <Route
          path="/customer"
          element={
            <RequreAuth roles={["ADMIN"]}>
              <Customer />
            </RequreAuth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
