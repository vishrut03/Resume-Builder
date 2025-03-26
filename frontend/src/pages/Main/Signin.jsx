"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import PersonalDetails from "./PersonalDetails"
import Signup from "./Signup"
import UsernameLogin from "./UsernameLogin"
import PhoneNumber from "./PhoneNumber"
import EmailOtp from "./EmailOtp"

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path
      fill="currentColor"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </svg>
)

const Signin = () => {
  const [current, setCurrent] = useState("signin")

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("token")
      if (!token) return
      try {
        const response = await axios.get("http://localhost:3001/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (response.data.message === "Token is valid") {
          setCurrent("personaldetails")
        } else {
          Cookies.remove("token")
        }
      } catch (error) {
        console.error("Token verification failed:", error)
        Cookies.remove("token")
      }
    }
    verifyToken()
  }, [])

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:8000") return
      const { token } = event.data
      if (token) {
        Cookies.set("token", token, { expires: 1 })
        localStorage.setItem("currentStep", "personaldetails")
        window.location.reload()
        setCurrent("personaldetails")
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const openOAuthPopup = (url, name) => {
    const width = 1100
    const height = 800
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2
    const popup = window.open(url, name, `width=${width},height=${height},left=${left},top=${top}`)
    if (!popup) {
      alert("Popup blocked. Please allow popups for this site.")
    }
  }

  if (current === "signup") return <Signup />
  if (current === "personaldetails") return <PersonalDetails />
  if (current === "usernameLogin") return <UsernameLogin />
  if (current === "phoneNumber") return <PhoneNumber />
  if (current === "email") return <EmailOtp />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="w-full max-w-4xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div
            className="md:w-1/2 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518611507436-f9221403cca2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZmZXNpb25hbHxlbnwwfHwwfHx8MA%3D%3D')" }}
          ></div>
          <div className="md:w-1/2 p-8">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Sign In</h2>
            <div className="space-y-4">
              <button
                onClick={() => openOAuthPopup("https://resume-builder-1g5v.onrender.com/auth/google", "Google OAuth")}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <GoogleIcon />
                <span>Sign in with Google</span>
              </button>
              <button
                onClick={() => openOAuthPopup("https://resume-builder-1g5v.onrender.com/auth/github/login", "GitHub OAuth")}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <GithubIcon />
                <span>Sign in with GitHub</span>
              </button>
              <button
                onClick={() => setCurrent("usernameLogin")}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span>Sign in with Username</span>
              </button>
              <button
                onClick={() => setCurrent("phoneNumber")}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span>Sign in with Phone</span>
              </button>
              <button
                onClick={() => setCurrent("email")}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>Sign in with Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin

