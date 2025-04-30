"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation } from "convex/react"
import { api } from "@/lib/convex"
import { toast } from "sonner"
import { Doc } from "@/convex/_generated/dataModel"

// Type for new ideas (without system fields)
type IdeaInput = Omit<Doc<"ideas">, "_id" | "_creationTime" | "createdAt" | "updatedAt">

export function IdeasUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const importIdeas = useMutation(api.ideas.importIdeas)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile)
    } else {
      toast.error("Please select a valid JSON file")
      e.target.value = ""
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsLoading(true)
    try {
      const text = await file.text()
      const ideas = JSON.parse(text)

      // Validate ideas structure
      if (!Array.isArray(ideas)) {
        throw new Error("Invalid JSON format. Expected an array of ideas.")
      }

      // Basic validation of each idea
      const validIdeas = ideas.filter((idea): idea is IdeaInput => {
        return (
          typeof idea.name === "string" &&
          typeof idea.description === "string" &&
          (typeof idea.imageUrl === "string" || typeof idea.imageUrl === "undefined") &&
          (typeof idea.srcUrl === "string" || typeof idea.srcUrl === "undefined")
        )
      })

      if (validIdeas.length === 0) {
        throw new Error("No valid ideas found in the file")
      }

      // Import ideas
      await importIdeas({ ideas: validIdeas })
      toast.success(`Successfully imported ${validIdeas.length} ideas`)

      // Reset form
      setFile(null)
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      if (input) input.value = ""
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to import ideas")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Input type="file" accept=".json" onChange={handleFileChange} className="flex-1" />
        <Button onClick={handleUpload} disabled={!file || isLoading}>
          {isLoading ? "Importing..." : "Import"}
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">Upload a JSON file containing an array of ideas. Each idea must have name and description. Optional fields: imageUrl, srcUrl.</div>
    </div>
  )
}
