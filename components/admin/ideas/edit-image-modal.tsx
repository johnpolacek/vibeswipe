import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/lib/convex"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"
import { ImageIcon, AlertCircle } from "lucide-react"

interface EditImageModalProps {
  ideaId: Id<"ideas">
  currentImageUrl?: string
  isOpen: boolean
  onClose: () => void
}

export function EditImageModal({ ideaId, currentImageUrl, isOpen, onClose }: EditImageModalProps) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl || "")
  const [isImageError, setIsImageError] = useState(false)
  const updateIdea = useMutation(api.ideas.updateIdea)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateIdea({
        id: ideaId,
        update: {
          imageUrl,
        },
      })
      toast.success("Image URL updated successfully")
      onClose()
    } catch (error) {
      toast.error("Failed to update image URL")
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Image URL</DialogTitle>
          <DialogDescription>Update the image URL for this idea. The image should be publicly accessible.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value)
                  setIsImageError(false)
                }}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden">
              {imageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className={`w-full h-full object-cover transition-opacity duration-200 ${isImageError ? "opacity-0" : "opacity-100"}`}
                    onError={() => setIsImageError(true)}
                    onLoad={() => setIsImageError(false)}
                  />
                  {isImageError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                      <AlertCircle className="w-8 h-8 text-destructive" />
                      <p className="text-sm text-muted-foreground">Failed to load image. Please check the URL and try again.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Enter an image URL above to see a preview</p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isImageError && imageUrl !== ""}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
