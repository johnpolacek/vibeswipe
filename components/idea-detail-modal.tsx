"use client"

import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, X, Star } from "lucide-react"
import type { StartupIdea } from "@/lib/data"

interface IdeaDetailModalProps {
  idea: StartupIdea
  isOpen: boolean
  onClose: () => void
  onLike: () => void
  onDislike: () => void
  onSave: () => void
  isSaved: boolean
}

export function IdeaDetailModal({ idea, isOpen, onClose, onLike, onDislike, onSave, isSaved }: IdeaDetailModalProps) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 h-[90vh] max-h-[800px] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {idea.imageUrl ? (
            <div className="relative w-full aspect-[9/16]">
              <Image src={idea.imageUrl || "/placeholder.svg"} alt={idea.title} fill className="object-cover" />
            </div>
          ) : (
            <div className={`w-full aspect-[9/16] bg-gradient-to-br ${getGradient(idea.id)}`} />
          )}

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold">{idea.title}</h2>
              <Button variant="ghost" size="icon" className={`rounded-full ${isSaved ? "text-yellow-500" : ""}`} onClick={onSave}>
                <Star className={isSaved ? "fill-yellow-500" : ""} size={24} />
              </Button>
            </div>
            <p className="text-gray-600">{idea.description}</p>

            {idea.likes && idea.matches && (
              <div className="flex gap-4 mt-6 text-sm text-gray-500">
                <div>{idea.likes} likes</div>
                <div>{idea.matches} matches</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 p-4 border-t">
          <Button variant="outline" size="icon" className="rounded-full h-16 w-16 border-2 border-red-500 text-red-500" onClick={onDislike}>
            <X size={32} />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-16 w-16 border-2 border-primary text-primary" onClick={onLike}>
            <Check size={32} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
