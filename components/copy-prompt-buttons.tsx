"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { generatePRDPrompt, generateDevPrompt, copyToClipboard } from "@/lib/prompts"
import { toast } from "sonner"

interface CopyPromptButtonsProps {
  idea: {
    name: string
    description: string
  }
}

export function CopyPromptButtons({ idea }: CopyPromptButtonsProps) {
  const [copying, setCopying] = useState<"prd" | "dev" | null>(null)

  const handleCopy = async (type: "prd" | "dev") => {
    const prompt = type === "prd" ? generatePRDPrompt(idea) : generateDevPrompt(idea)
    setCopying(type)

    try {
      await copyToClipboard(prompt)
      toast.success(`${type === "prd" ? "PRD" : "Development"} prompt copied!`, {
        description: "Ready to use in your favorite AI assistant",
      })
    } catch (error) {
      console.error("Failed to copy", error)
      toast.error("Failed to copy", {
        description: "Please try again",
      })
    }

    // Reset copying state after a short delay
    setTimeout(() => setCopying(null), 2000)
  }

  return (
    <div className="flex gap-3">
      <Button variant="outline" size="sm" onClick={() => handleCopy("prd")} className="flex-1">
        {copying === "prd" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
        Copy PRD Prompt
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleCopy("dev")} className="flex-1">
        {copying === "dev" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
        Copy Dev Prompt
      </Button>
    </div>
  )
}
