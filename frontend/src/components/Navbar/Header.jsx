"use client"

import { useState } from "react"
import Cookie from "js-cookie"
import Logo from "../../pages/Logo/Logo"

export default function Header() {
  const [token, setToken] = useState(Cookie.get("token"))
  const [current, setCurrent] = useState("header");
  const handleSignOut = () => { 
    Cookie.remove("token")
    setToken(null)
    window.location.reload()
  }
  if(current==="home"){
    window.location.reload();
  }
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Logo size={32} color="white" />
          <span className="text-xl font-bold ml-2">ResumeBuilder</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrent("home")}
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold 
                       hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105
                       shadow-md hover:shadow-lg"
          >
            Home
          </button>
          {token && (
            <button
              onClick={handleSignOut}
              className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-full font-semibold 
                         hover:bg-white hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

