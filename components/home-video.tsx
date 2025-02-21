"use client"

import { useRef, useEffect } from "react"

export const Homevideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [])

  return (
    <>
      <div className="w-full h-[280px] md:h-screen" />
      <div className="fixed top-[60px] left-0 right-0 h-[280px] md:h-screen z-10 overflow-hidden">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  )
}

