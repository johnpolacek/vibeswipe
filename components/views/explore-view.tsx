"use client"

import { useState } from "react"
import { IdeaCarousel } from "@/components/idea-carousel"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { StartupIdea } from "@/lib/data"

export function ExploreView() {
  const { isLoaded } = useUser()
  const [showCarousel, setShowCarousel] = useState(true)
  const convexIdeas = useQuery(api.ideas.list) ?? []

  // Map Convex ideas to StartupIdea type
  interface ConvexIdea {
    _id: string
    name: string
    description: string
    imageUrl?: string
    srcUrl?: string
    createdAt: string | number | Date
  }
  const ideas: StartupIdea[] = (convexIdeas as ConvexIdea[]).map((idea) => ({
    id: idea._id,
    title: idea.name,
    description: idea.description,
    imageUrl: idea.imageUrl,
    srcUrl: idea.srcUrl,
    createdAt: new Date(idea.createdAt),
  }))

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!ideas.length) {
    return (
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="text-center mb-12">
          <div className="flex justify-center mt-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
          Explore <span className="text-primary">Ideas</span>
        </h1>
        <p className="max-w-[600px] mx-auto text-gray-500 text-balance md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Swipe through project ideas and find your vibe.</p>
      </div>

      <div className="mx-auto max-w-3xl">
        {!showCarousel && (
          <div className="text-center">
            <Button size="lg" onClick={() => setShowCarousel(true)} className="px-6 py-3">
              Start Swiping
            </Button>
          </div>
        )}
      </div>

      <IdeaCarousel ideas={ideas} isOpen={showCarousel} onClose={() => setShowCarousel(false)} />
    </div>
  )
}
