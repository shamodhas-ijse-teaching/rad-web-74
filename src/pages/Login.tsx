import React, { useState } from "react"
import { getMyDetails, login } from "../service/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { setUser } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please fill all fields")
    }

    try {
      const loginData = await login(email, password)
      const accessToken = loginData?.data?.accessToken
      const refreshToken = loginData?.data?.refreshToken
      if (accessToken && refreshToken) {
        await localStorage.setItem("ACCESS_TOKEN", accessToken)
        await localStorage.setItem("REFRESH_TOKEN", refreshToken)

        const myRes = await getMyDetails()
        const userData = myRes?.data
        setUser(userData)

        navigate("/")
      } else {
        alert("Login fail..!")
      }
    } catch (err) {
      console.error(err)
      alert("Login fail..!")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col gap-4 w-80">
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
        <p className="mt-4 text-gray-700 text-center">
          <span>Don't have an account? </span>
          <button
            onClick={() => {
              navigate("/register")
            }}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
