"use client"

import { useQuery } from "convex/react"
import { api } from "@/lib/convex"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { Doc } from "@/convex/_generated/dataModel"

type Idea = Doc<"ideas">

export function IdeasTable() {
  const ideas = useQuery(api.ideas.getAllIdeas) as Idea[] | undefined

  if (!ideas) {
    return <div>Loading...</div>
  }

  if (ideas.length === 0) {
    return <div className="text-center text-muted-foreground py-8">No ideas found</div>
  }

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ideas.map((idea) => (
            <TableRow key={idea._id}>
              <TableCell className="font-medium">{idea.name}</TableCell>
              <TableCell className="max-w-md truncate">{idea.description}</TableCell>
              <TableCell>{formatDate(idea.createdAt)}</TableCell>
              <TableCell>{formatDate(idea.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
