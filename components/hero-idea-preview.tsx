"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { mockIdeas } from "@/lib/data/mock-ideas"

export function HeroIdeaPreview() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Slower animation - 5 seconds per card
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % mockIdeas.length)
    }, 5000) // 5 seconds per card

    return () => clearInterval(interval)
  }, [])

  // Determine rotation direction based on card index (alternating)
  const getRotation = (index: number): string => {
    return index % 2 === 0 ? "3deg" : "-3deg"
  }

  return (
    <div id="idea-carousel-preview" className="relative w-[300px] h-[450px] md:w-[350px] md:h-[525px] rounded-xl shadow-xl overflow-hidden bg-black ring-8 ring-primary/20">
      {/* All card images pre-rendered with CSS transitions */}
      {mockIdeas.map((idea, index) => (
        <Card
          key={idea.id}
          className="absolute inset-0 w-full h-full border-2 border-white/20 overflow-hidden flex flex-col items-center justify-end transition-all ease-in-out duration-500"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transform: index === currentIndex ? "rotate(0deg)" : `rotate(${getRotation(index)})`,
            zIndex: index === currentIndex ? 1 : 0,
            pointerEvents: "none",
            scale: index === currentIndex ? 1 : 1.1,
          }}
        >
          <img src={idea.imageUrl} alt={idea.title} className="object-cover w-full h-full absolute inset-0" />
          <div className="absolute bottom-0 left-0 z-10 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 z-10 w-full h-full bg-gradient-to-b from-background/30 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full pt-6 pb-8 z-10 px-2 flex flex-col items-center">
            <h4 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-balance text-white text-center drop-shadow-lg pb-2">{idea.title}</h4>
            <p className="text-sm md:text-base text-balance text-white/80 text-center drop-shadow-lg">{idea.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
