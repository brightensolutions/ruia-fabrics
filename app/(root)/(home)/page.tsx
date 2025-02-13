"use client"
import { lazy, Suspense } from "react"
import { Homevideo } from "@/components/home-video"
import { ClientMarquee } from "@/components/Our-Client"

const InfiniteMovingCardsDemo = lazy(() =>
  import("@/components/Home").then((mod) => ({ default: mod.InfiniteMovingCardsDemo })),
)
const Aboutus = lazy(() => import("@/components/About-us"))
const OurIndustry = lazy(() => import("@/components/Our-Industry"))
const OurServices = lazy(() => import("@/components/Our-Services"))
const Quality = lazy(() => import("@/components/Quality"))
const WhyChoode = lazy(() => import("@/components/Why-Choode"))
// If MarqueeDemo is a default export

// If MarqueeDemo is a named export
// const MarqueeDemo = lazy(() => import("@/components/Our-Client").then((mod) => ({ default: mod.MarqueeDemo })))
const ContactUs = lazy(() => import("@/components/ContactUs"))

const Page = () => {
  return (
    <div className="font-sans">
      <Homevideo />
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center relative z-40  justify-center bg-custom-cream text-custom-black">
            Loading...
          </div>
        }
      >
        <section className="bg-custom-white text-custom-black z-40 relative">
          <InfiniteMovingCardsDemo />
        </section>
        <section className="bg-custom-cream text-custom-black relative z-40">
          <Aboutus />
        </section>
        <section className="bg-custom-white text-custom-black">
          <OurIndustry />
        </section>
        <section className="bg-custom-green text-custom-white">
          <OurServices />
        </section>
        <section className="bg-custom-cream text-custom-black">
          <Quality />
        </section>
        <section className="bg-custom-white text-custom-black">
          <WhyChoode />
        </section>
        <section className="bg-custom-green text-custom-white">
          <ClientMarquee />
        </section>
        <section className="bg-custom-cream text-custom-black">
          <ContactUs />
        </section>
      </Suspense>
    </div>
  )
}

export default Page

