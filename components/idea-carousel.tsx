"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { motion, AnimatePresence, type PanInfo } from "motion/react"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import type { StartupIdea } from "@/lib/data"

interface IdeaCarouselProps {
  ideas: StartupIdea[]
  isOpen: boolean
  onClose: () => void
}

function seededRandom(str: string) {
  // Simple hash for deterministic random
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) / 2147483647
}

export function IdeaCarousel({ ideas, isOpen, onClose }: IdeaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<string[]>([])
  const [saved, setSaved] = useState<string[]>([])
  const [exitX, setExitX] = useState<number | null>(null)

  const currentIdea = ideas[currentIndex]

  // Handle like/dislike actions
  const handleAction = (action: "like" | "dislike") => {
    if (currentIndex < ideas.length - 1) {
      if (action === "like") {
        setLiked([...liked, currentIdea.id])
        setExitX(500)
      } else {
        setExitX(-500)
      }

      // Move to next idea after a short delay
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setExitX(null)
      }, 300)
    } else {
      // End of ideas
      onClose()
    }
  }

  // Handle save action
  const handleSave = () => {
    if (!saved.includes(currentIdea.id)) {
      setSaved([...saved, currentIdea.id])
    } else {
      setSaved(saved.filter((id) => id !== currentIdea.id))
    }
  }

  // Handle drag end for swiping
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleAction("like")
    } else if (info.offset.x < -100) {
      handleAction("dislike")
    }
  }

  // Generate a random gradient based on the idea's id
  const getGradient = (id: string) => {
    const gradients = [
      "from-pink-500 to-purple-500",
      "from-blue-500 to-teal-500",
      "from-green-500 to-emerald-500",
      "from-yellow-500 to-orange-500",
      "from-purple-500 to-indigo-500",
      "from-red-500 to-pink-500",
      "from-fuchsia-500 to-cyan-500",
      "from-lime-500 to-green-700",
      "from-amber-500 to-orange-700",
      "from-sky-500 to-blue-700",
    ]
    const rand = seededRandom(id)
    return gradients[Math.floor(rand * gradients.length)]
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 h-[90vh] max-h-[800px] flex flex-col gap-0 overflow-hidden">
        <VisuallyHidden.Root>
          <DialogTitle>Startup Ideas</DialogTitle>
        </VisuallyHidden.Root>
        {currentIndex < ideas.length ? (
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdea.id}
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: exitX || 0 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="h-full w-full"
              >
                <div className="relative h-full w-full flex flex-col">
                  {/* Image or gradient */}
                  {currentIdea.imageUrl ? (
                    <div className="pointer-events-none absolute inset-0 w-full aspect-[9/16] flex-shrink-0 z-0">
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black to-transparent z-10" />
                      <Image src={currentIdea.imageUrl || "/placeholder.svg"} alt={currentIdea.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className={`pointer-events-none absolute inset-0 w-full aspect-[9/16] flex-shrink-0 bg-gradient-to-br z-0 ${getGradient(currentIdea.id)}`} />
                  )}

                  {/* Overlay for LIKE/NOPE indicators */}
                  <div
                    className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg text-xl font-bold rotate-[-12deg] opacity-0 transition-opacity duration-200 z-20"
                    style={{ opacity: exitX && exitX < 0 ? 1 : 0 }}
                  >
                    NOPE
                  </div>
                  <div
                    className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg text-xl font-bold rotate-12 opacity-0 transition-opacity duration-200 z-20"
                    style={{ opacity: exitX && exitX > 0 ? 1 : 0 }}
                  >
                    LIKE
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex-1 overflow-auto flex flex-col justify-end text-white">
                    <div className="flex flex-col items-center mb-4">
                      <h2 className="text-4xl md:text-5xl font-extrabold text-center leading-tight drop-shadow-lg">{currentIdea.title}</h2>
                      <div className="text-lg text-center text-balance">{currentIdea.description}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">You&apos;ve seen all ideas!</h3>
              <p className="text-gray-600 mb-4">Check back later for more or submit your own.</p>
              <Button onClick={() => setCurrentIndex(0)} className="bg-primary hover:bg-primary/90">
                Start Over
              </Button>
            </div>
          </div>
        )}

        {currentIndex < ideas.length && (
          <div className="flex justify-center gap-8 py-8 border-t border-white/30 bg-black">
            <Button variant="outline" size="icon" className="rounded-full h-16 w-16 border-2 border-red-500 text-red-500 hover:scale-105" onClick={() => handleAction("dislike")}>
              <X className="scale-150" size={32} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-16 w-16 border-2 border-primary text-primary hover:scale-105" onClick={() => handleAction("like")}>
              <Check className="scale-150" size={32} />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
