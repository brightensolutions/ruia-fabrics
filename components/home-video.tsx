"use client"

import { useRef, useEffect } from "react"

export const Homevideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set video to load as fast as possible
    video.preload = "auto"
    video.load()

    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.error("Error playing video:", error)
      }
    }

    playVideo()

    // Try to play video as soon as metadata is loaded
    video.addEventListener("loadedmetadata", playVideo)

    return () => {
      video.removeEventListener("loadedmetadata", playVideo)
    }
  }, [])

  return (
    <>
      <div className="w-full h-[280px] md:h-screen" />
      <div className="fixed top-[60px] left-0 right-0 h-[280px] md:h-screen z-10 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          style={{ opacity: 1 }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  )
}

