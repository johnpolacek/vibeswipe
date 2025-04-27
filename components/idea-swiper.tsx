"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from "motion/react"
import { Check, X, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IdeaCarousel } from "@/components/idea-carousel"
import type { StartupIdea } from "@/lib/data"

interface IdeaSwiperProps {
  ideas: StartupIdea[]
}

export function IdeaSwiper({ ideas }: IdeaSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<string | null>(null)
  const [liked, setLiked] = useState<number[]>([])
  const [saved, setSaved] = useState<number[]>([])
  const [showCarousel, setShowCarousel] = useState(false)

  const currentIdea = ideas[currentIndex]

  // Motion values for swipe
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10])
  const likeOpacity = useTransform(x, [0, 100], [0, 1])
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0])

  const handleSwipe = (dir: string) => {
    if (currentIndex < ideas.length - 1) {
      setDirection(dir)

      if (dir === "right") {
        setLiked([...liked, Number(currentIdea.id)])
      }

      // After animation completes, the index will be updated in onExitComplete
    } else {
      // Reset to beginning if we've gone through all ideas
      setCurrentIndex(0)
    }
  }

  const handleSave = () => {
    if (!saved.includes(Number(currentIdea.id))) {
      setSaved([...saved, Number(currentIdea.id)])
    } else {
      setSaved(saved.filter((id) => id !== Number(currentIdea.id)))
    }
  }

  const onExitComplete = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1)
    setDirection(null)
    x.set(0) // Reset position
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe("right")
    } else if (info.offset.x < -100) {
      handleSwipe("left")
    }
  }

  const variants = {
    enter: (direction: string) => {
      return {
        x: direction === "right" ? 300 : -300,
        opacity: 0,
        scale: 0.8,
      }
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: (direction: string) => {
      return {
        x: direction === "right" ? 300 : -300,
        opacity: 0,
        scale: 0.8,
        transition: {
          duration: 0.3,
        },
      }
    },
  }

  // Generate a gradient based on the idea's id
  const getGradient = (id: number) => {
    const gradients = [
      "from-pink-500 to-purple-500",
      "from-blue-500 to-teal-500",
      "from-green-500 to-emerald-500",
      "from-yellow-500 to-orange-500",
      "from-purple-500 to-indigo-500",
      "from-red-500 to-pink-500",
    ]
    return gradients[id % gradients.length]
  }

  return (
    <>
      <div className="relative h-[600px] w-full max-w-sm mx-auto">
        <AnimatePresence custom={direction} onExitComplete={onExitComplete}>
          {currentIndex < ideas.length && (
            <motion.div
              key={currentIdea.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
              style={{ x, rotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              <Card className="w-full h-[600px] overflow-hidden relative">
                {/* Like/Nope Overlays */}
                <motion.div className="absolute top-10 right-10 z-10 rotate-12 border-4 border-green-500 text-green-500 px-4 py-1 rounded-lg text-2xl font-bold" style={{ opacity: likeOpacity }}>
                  LIKE
                </motion.div>
                <motion.div className="absolute top-10 left-10 z-10 -rotate-12 border-4 border-red-500 text-red-500 px-4 py-1 rounded-lg text-2xl font-bold" style={{ opacity: nopeOpacity }}>
                  NOPE
                </motion.div>

                <CardContent className="p-0 h-full flex flex-col">
                  {currentIdea.imageUrl ? (
                    <div className="relative h-[400px] w-full">
                      <Image src={currentIdea.imageUrl || "/placeholder.svg"} alt={currentIdea.title} fill className="object-cover" onClick={() => setShowCarousel(true)} />
                    </div>
                  ) : (
                    <div className={`h-[400px] w-full bg-gradient-to-br ${getGradient(Number(currentIdea.id))}`} onClick={() => setShowCarousel(true)} />
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold line-clamp-1">{currentIdea.title}</h3>
                      <Button variant="ghost" size="icon" className={`rounded-full ${saved.includes(Number(currentIdea.id)) ? "text-yellow-500" : ""}`} onClick={handleSave}>
                        <Star className={saved.includes(Number(currentIdea.id)) ? "fill-yellow-500" : ""} size={20} />
                      </Button>
                    </div>
                    <p className="text-gray-600 flex-1 text-sm line-clamp-3">{currentIdea.description}</p>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 border-red-500 text-red-500" onClick={() => handleSwipe("left")}>
                        <X size={24} />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 border-blue-500 text-blue-500" onClick={() => setShowCarousel(true)}>
                        <MessageCircle size={24} />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 border-green-500 text-green-500" onClick={() => handleSwipe("right")}>
                        <Check size={24} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {currentIndex >= ideas.length && (
          <Card className="w-full h-[600px] flex items-center justify-center">
            <CardContent className="text-center p-6">
              <h3 className="text-xl font-bold mb-2">You&apos;ve seen all ideas!</h3>
              <p className="text-gray-600 mb-4">Check back later for more or submit your own.</p>
              <Button onClick={() => setCurrentIndex(0)} className="bg-green-500 hover:bg-green-600">
                Start Over
              </Button>
            </CardContent>
          </Card>
        )}

        {liked.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              You&apos;ve liked {liked.length} idea{liked.length !== 1 ? "s" : ""}.
              <Link href="/matches" className="text-green-500 ml-1 hover:underline">
                View your matches
              </Link>
            </p>
          </div>
        )}
      </div>

      {currentIndex < ideas.length && <IdeaCarousel ideas={ideas.slice(currentIndex)} isOpen={showCarousel} onClose={() => setShowCarousel(false)} />}
    </>
  )
}
