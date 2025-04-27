"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { motion, AnimatePresence, type PanInfo } from "motion/react"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import type { StartupIdea } from "@/lib/data"
import { getGradient } from "@/lib/utils"
import { saveIdeaSwipe } from "@/app/_actions/save-idea-swipe"
import { useUser, SignInButton } from "@clerk/nextjs"
import { getUserSwipedIdeaIds } from "@/lib/services/visits"

interface IdeaCarouselProps {
  ideas: StartupIdea[]
  isOpen: boolean
  onClose: () => void
  isGuest?: boolean
}

export function IdeaCarousel({ ideas, isOpen, onClose, isGuest }: IdeaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<string[]>([])
  const [exitX, setExitX] = useState<number | null>(null)
  const [unratedIdeas, setUnratedIdeas] = useState<StartupIdea[]>([])
  const [loading, setLoading] = useState(true)
  const [previewFinished, setPreviewFinished] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    if (isGuest) {
      setUnratedIdeas(ideas)
      setCurrentIndex(0)
      setLoading(false)
      setPreviewFinished(false)
      return
    }
    async function fetchUnrated() {
      if (!user) {
        setUnratedIdeas([])
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const swipedIds = await getUserSwipedIdeaIds(user.id)
        const filtered = ideas.filter((idea) => !swipedIds.includes(idea.id))
        setUnratedIdeas(filtered)
        setCurrentIndex(0)
        setLoading(false)
      } catch {
        setUnratedIdeas([])
        setLoading(false)
      }
    }
    fetchUnrated()
  }, [user, ideas, isGuest])

  const currentIdea = unratedIdeas[currentIndex]

  // Handle like/dislike actions
  const handleAction = async (action: "like" | "dislike") => {
    if (isGuest) {
      // Just move to next idea, do not save
      if (currentIndex < unratedIdeas.length - 1) {
        if (action === "like") {
          setLiked([...liked, currentIdea.id])
          setExitX(500)
        } else {
          setExitX(-500)
        }
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1)
          setExitX(null)
        }, 300)
      } else {
        setPreviewFinished(true)
      }
      return
    }
    if (!user) return // Optionally, show sign-in prompt
    if (currentIndex < unratedIdeas.length - 1) {
      if (action === "like") {
        setLiked([...liked, currentIdea.id])
        setExitX(500)
      } else {
        setExitX(-500)
      }
      // Save swipe
      try {
        const args = {
          userId: user.id,
          ideaId: currentIdea.id,
          liked: action === "like",
          createdAt: Date.now(),
        }
        await saveIdeaSwipe(args)
      } catch {}
      // Move to next idea after a short delay
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1)
        setExitX(null)
      }, 300)
    } else {
      // Last idea: save swipe and close
      try {
        const args = {
          userId: user.id,
          ideaId: currentIdea.id,
          liked: action === "like",
          createdAt: Date.now(),
        }
        await saveIdeaSwipe(args)
      } catch {}
      onClose()
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent hideClose={true} className="sm:max-w-md p-0 h-[90vh] max-h-[800px] flex flex-col gap-0 overflow-hidden">
        <VisuallyHidden.Root>
          <DialogTitle>Startup Ideas</DialogTitle>
        </VisuallyHidden.Root>
        {loading ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="sr-only">Loading...</div>
          </div>
        ) : previewFinished && isGuest ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">We hope you enjoyed the preview!</h3>
              <p className="text-gray-600 mb-4 text-balance">Sign up for an account to access all ideas, save your matches, discover trending ideas, and submit your own.</p>
              <SignInButton mode="modal">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Sign up to Continue
                </Button>
              </SignInButton>
            </div>
          </div>
        ) : currentIndex < unratedIdeas.length ? (
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
        ) : isGuest ? null : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">You&apos;ve seen all ideas!</h3>
              <p className="text-gray-600 mb-4">Check back later for more or submit your own.</p>
              <Button size="lg" onClick={onClose} className="bg-primary hover:bg-primary/90">
                Close
              </Button>
            </div>
          </div>
        )}

        {currentIndex < unratedIdeas.length && !loading && !previewFinished && (
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
