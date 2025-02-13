"use client"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export const Homevideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error attempting to play video:", error)
      })
    }
  }, [])

  return (
    <>
      {/* Spacer div to maintain layout */}
      <div className="w-full h-[280px] md:h-screen" />

      {/* Fixed video container */}
      <div className="fixed top-[60px] left-0 right-0 h-[280px] md:h-screen z-10 overflow-hidden">
        
        <video
          ref={videoRef}
          className="w-full h-full object-fill-"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          style={{
            opacity: isVideoLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  )
}

