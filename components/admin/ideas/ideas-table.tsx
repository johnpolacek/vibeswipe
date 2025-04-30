"use client"

import { useQuery } from "convex/react"
import { api } from "@/lib/convex"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import { EditImageModal } from "./edit-image-modal"
import { ImageIcon } from "lucide-react"
import { EditableCell } from "./editable-cell"

type Idea = Doc<"ideas">

export function IdeasTable() {
  const [cursor, setCursor] = useState<string | null>(null)
  const [editingIdea, setEditingIdea] = useState<{ id: string; imageUrl?: string } | null>(null)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const PAGE_SIZE = 20

  const paginatedIdeas = useQuery(api.ideas.getAllIdeas, {
    paginationOpts: {
      cursor: cursor ?? undefined,
      numItems: PAGE_SIZE,
    },
  }) as { ideas: Idea[]; nextCursor: string | null } | undefined

  const handleImageError = (ideaId: string) => {
    setFailedImages((prev) => new Set(prev).add(ideaId))
  }

  if (!paginatedIdeas) {
    return <div>Loading...</div>
  }

  const { ideas, nextCursor } = paginatedIdeas

  if (ideas.length === 0 && !cursor) {
    return <div className="text-center text-muted-foreground py-8">No ideas found</div>
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ideas.map((idea: Idea) => (
              <TableRow key={idea._id}>
                <TableCell>
                  <div className="relative w-16 h-16 cursor-pointer group" onClick={() => setEditingIdea({ id: idea._id, imageUrl: idea.imageUrl })}>
                    {idea.imageUrl && !failedImages.has(idea._id) ? (
                      <>
                        <Image src={idea.imageUrl} alt={idea.name} fill className="object-cover rounded-md transition-opacity group-hover:opacity-50" onError={() => handleImageError(idea._id)} />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ImageIcon className="w-6 h-6 text-foreground" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-muted rounded-md flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                        <span className="text-muted-foreground text-sm text-center px-1">{failedImages.has(idea._id) ? "Failed to load" : "No image"}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <EditableCell id={idea._id} value={idea.name} field="name" className="font-medium" />
                </TableCell>
                <TableCell>
                  <EditableCell id={idea._id} value={idea.description} field="description" className="w-full truncate" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {(cursor || (nextCursor && ideas.length >= PAGE_SIZE)) && (
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setCursor(null)} disabled={!cursor}>
            First Page
          </Button>
          <Button variant="outline" onClick={() => setCursor(nextCursor)} disabled={!nextCursor || ideas.length < PAGE_SIZE}>
            Next Page
          </Button>
        </div>
      )}

      {editingIdea && (
        <EditImageModal
          ideaId={editingIdea.id as Id<"ideas">}
          currentImageUrl={editingIdea.imageUrl}
          isOpen={true}
          onClose={() => {
            setEditingIdea(null)
            // Clear failed image state when closing modal
            setFailedImages((prev) => {
              const newSet = new Set(prev)
              newSet.delete(editingIdea.id)
              return newSet
            })
          }}
        />
      )}
    </div>
  )
}
