'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PulsingWhatsApp() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed bottom-3 right-2">
      <Link href="https://wa.me/917021418483" target="_blank" rel="noopener noreferrer">
        <div
          className={`transition-all duration-1000 ease-in-out ${
            isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-80'
          }`}
        >
          <Image
            src="/images/whatsapp.png"
            alt="WhatsApp"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
      </Link>
    </div>
  )
}
