import { useState, useRef, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/lib/convex"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface EditableCellProps {
  id: Id<"ideas">
  value: string
  field: "name" | "description"
  className?: string
}

export function EditableCell({ id, value, field, className }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const updateIdea = useMutation(api.ideas.updateIdea)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = async () => {
    if (editValue.trim() === "") {
      toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`)
      return
    }

    try {
      await updateIdea({
        id,
        update: {
          [field]: editValue,
        },
      })
      setIsEditing(false)
      toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`)
    } catch (error) {
      toast.error(`Failed to update ${field}`)
      console.error(error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      setEditValue(value)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    const Component = field === "description" ? Textarea : Input
    return (
      <Component
        ref={inputRef as any}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn("w-full focus-visible:ring-1", field === "description" && "h-[80px] resize-none", className)}
      />
    )
  }

  return (
    <div onClick={() => setIsEditing(true)} className={cn("cursor-pointer rounded px-1 -mx-1 py-0.5 hover:bg-muted/50", className)}>
      {value}
    </div>
  )
}
