"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {  toast } from 'react-toastify';

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const adminId = localStorage.getItem("adminId")
    if (adminId) {
      router.push("/admin/Fabric-Photo")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store adminId in localStorage
        localStorage.setItem("adminId", data.adminId)
        toast.success("Login successful")
        router.push("/admin/Fabric-Photo")
      } else {
        toast.error(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error 
      ("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-darkgreen to-darkgreen/80">
      <Card className="w-full max-w-md shadow-2xl bg-white/20 rounded-[20px] border border-white/30 backdrop-blur-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl font-bold text-center font-rubik text-white">Admin Login</CardTitle>
          <CardDescription className="text-center text-white/80 font-abel text-lg">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center text-white/90">
                <FaUser className="mr-2" />
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-white bg-transparent border-b border-white/50 focus:border-white focus:outline-none placeholder-white/50 pb-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium flex items-center text-white/90">
                <FaLock className="mr-2" />
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-white bg-transparent border-b border-white/50 focus:border-white focus:outline-none pb-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-darkgreen hover:bg-white/90 transition-all duration-300 ease-in-out transform hover:scale-105 font-semibold text-lg py-2 rounded-full"
              disabled={isLoading}
            >
              {isLoading ? (
                "Logging in..."
              ) : (
                <>
                  <FaSignInAlt className="mr-2" />
                  Login
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

