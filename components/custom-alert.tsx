import React from "react"
import { cn } from "@/lib/utils"
import { XCircle, CheckCircle, AlertCircle, InfoIcon } from 'lucide-react'

type AlertVariant = "error" | "success" | "warning" | "info"

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: React.ReactNode
  className?: string
}

export function CustomAlert({ variant = "info", title, children, className }: AlertProps) {
  const variantStyles = {
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      title: title || "Error",
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: title || "Success",
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-800",
      icon: <AlertCircle className="h-5 w-5 text-yellow-600" />,
      title: title || "Warning",
    },
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <InfoIcon className="h-5 w-5 text-blue-600" />,
      title: title || "Information",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-md border p-4 text-sm",
        styles.container,
        className
      )}
    >
      <div className="mt-0.5">{styles.icon}</div>
      <div>
        {title && <h5 className="font-medium mb-1 font-rubik">{title}</h5>}
        <div className="text-sm font-roboto">{children}</div>
      </div>
    </div>
  )
}

