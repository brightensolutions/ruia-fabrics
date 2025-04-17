"use client"

import { cn } from "@/lib/utils"
import { Marquee } from "./magicui/marquee"

interface Brand {
  _id: string
  name: string
  username: string
  body: string
  image: string
}

interface ReviewCardProps {
  img: string
  name: string
  username: string
  body: string
}

const ReviewCard = ({ img, name, username, body }: ReviewCardProps) => {
  return (
    <figure className={cn("relative h-24 w-36 cursor-pointer overflow-hidden p-4")}>
      <div className="flex flex-row items-center gap-2">
        <div className="relative h-full w-full">
          <img src={img || "/placeholder.svg"} alt={name} className="h-full w-full object-contain" />
        </div>
      </div>
    </figure>
  )
}

export function MarqueeDemo({ brands = [] }: { brands?: Brand[] }) {
  // If no brands are provided, use default data
  const displayBrands =
    brands.length > 0
      ? brands
      : [
          {
            _id: "1",
            name: "Jack",
            username: "@jack",
            body: "I've never seen anything like this before. It's amazing. I love it.",
            image: "/marque-slider/1.png",
          },
          {
            _id: "2",
            name: "Jill",
            username: "@jill",
            body: "I don't know what to say. I'm speechless. This is amazing.",
            image: "/marque-slider/2.png",
          },
          {
            _id: "3",
            name: "John",
            username: "@john",
            body: "I'm at a loss for words. This is amazing. I love it.",
            image: "/marque-slider/3.png",
          },
          {
            _id: "4",
            name: "Jane",
            username: "@jane",
            body: "I'm at a loss for words. This is amazing. I love it.",
            image: "/marque-slider/4.png",
          },
        ]

  return (
    <div className="relative bg-custom-green flex w-full flex-col items-center justify-center overflow-hidden rounded-md py-6">
      <Marquee pauseOnHover className="[--duration:20s]">
        {displayBrands.map((brand) => (
          <ReviewCard key={brand._id} img={brand.image} name={brand.name} username={brand.username} body={brand.body} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-custom-green"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-custom-green"></div>
    </div>
  )
}
