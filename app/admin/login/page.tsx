"use client"

import React, { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CustomAlert } from "@/components/custom-alert"
import { Loader2, Lock } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await login(email, password)
      // Redirect is handled in the login function
    } catch (error: any) {
      setError(error.message || "Login failed. Please try again.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-cream/30">
      <div className="w-full max-w-md px-4">
        <Card className="border-none bg-white/10 backdrop-blur-3xl shadow-lg overflow-hidden">
          <div className="bg-custom-green h-2 w-full" />
          <CardHeader className="space-y-1 pt-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-custom-cream flex items-center justify-center">
                <Lock className="h-6 w-6 text-custom-green" />
              </div>
            </div>
            <CardTitle className="text-2xl font-rubik text-center text-custom-green">Admin Login</CardTitle>
            <CardDescription className="text-center text-zinc-900 font-roboto">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <CustomAlert variant="error">{error}</CustomAlert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-roboto">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ruiafabrics.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="font-roboto border-custom-cream focus:border-custom-green focus:ring-custom-green"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-roboto">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-roboto border-custom-cream focus:border-custom-green focus:ring-custom-green"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-custom-green hover:bg-custom-green/90 text-white font-rubik"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
         
        </Card>
      </div>
    </div>
  )
}
