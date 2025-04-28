"use client"

import { useState, useEffect } from "react"
import { IdeaCarousel } from "@/components/idea-carousel"
import { useUser, SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { StartupIdea } from "@/lib/data"
import { mockIdeas } from "@/lib/data/mock-ideas"
import { Card, CardContent } from "@/components/ui/card"

export function ExploreView() {
  const { isLoaded, isSignedIn } = useUser()
  // Only auto-show carousel if signed in
  const [showCarousel, setShowCarousel] = useState(isSignedIn)
  const convexIdeas = useQuery(api.ideas.list) ?? []

  // Auto-open carousel for signed-in users
  useEffect(() => {
    if (isLoaded && isSignedIn && !showCarousel) {
      setShowCarousel(true)
    }
  }, [isLoaded, isSignedIn])

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

  // For guests, always show mock ideas
  const showIdeas = isSignedIn ? ideas : mockIdeas
  const isGuest = !isSignedIn

  if (!showIdeas.length) {
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
      {!isGuest && (
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Explore <span className="text-primary">Ideas</span>
          </h1>
          <p className="max-w-[600px] mx-auto text-gray-500 text-balance md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Swipe through project ideas and find your vibe.</p>
          {/* Start Swiping button for signed-in users when carousel is not open */}
          {isSignedIn && !showCarousel && (
            <Button size="lg" className="mt-6" onClick={() => setShowCarousel(true)}>
              Start Swiping
            </Button>
          )}
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        {isGuest && !showCarousel && (
          <Card className="mb-8">
            <CardContent className="flex flex-col items-center gap-6 py-10">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Sign up to explore all ideas</h2>
                <p className="text-muted-foreground">
                  Create an account to swipe, save, and unlock the full experience.
                  <br />
                  Or preview a few ideas below.
                </p>
              </div>
              <SignInButton mode="modal">
                <Button size="lg" className="w-full max-w-xs">
                  Sign up / Sign in
                </Button>
              </SignInButton>
              <div className="flex items-center w-full max-w-xs gap-2">
                <div className="flex-1 h-px bg-muted" />
                <span className="text-muted-foreground text-xs">or</span>
                <div className="flex-1 h-px bg-muted" />
              </div>
              <Button size="lg" variant="outline" className="w-full max-w-xs" onClick={() => setShowCarousel(true)}>
                Preview Ideas
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {showCarousel && <IdeaCarousel ideas={showIdeas} isOpen={showCarousel} onClose={() => setShowCarousel(false)} {...(isGuest && { isGuest: true })} />}
    </div>
  )
}
