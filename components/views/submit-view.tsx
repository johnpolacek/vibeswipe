"use client"

import { useState } from "react"
import { SignInButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function SubmitView() {
  const [isGuest, setIsGuest] = useState(false)
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="container max-w-4xl px-4 py-12 md:px-6 md:py-24">
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="animate-pulse">Loading...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show auth choice if not signed in and not chosen to continue as guest
  if (!isSignedIn && !isGuest) {
    return (
      <div className="container max-w-4xl px-4 py-12 md:px-6 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Submit Your <span className="text-green-500">Startup Idea</span>
          </h1>
          <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Share your innovative concept with our community and get valuable feedback.</p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center gap-6 py-16">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Choose How to Continue</h2>
              <p className="text-muted-foreground">Sign in to track and manage your submissions, or continue as a guest</p>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-[300px]">
              <SignInButton mode="modal">
                <Button size="lg" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
              <Button variant="outline" size="lg" className="w-full" onClick={() => setIsGuest(true)}>
                Continue as Guest
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show the submission form for signed in users or guests
  return (
    <div className="container max-w-4xl px-4 py-12 md:px-6 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Submit Your <span className="text-green-500">Startup Idea</span>
        </h1>
        <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Share your innovative concept with our community and get valuable feedback.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Idea Details</CardTitle>
          <CardDescription>Fill out the form below to submit your startup idea to our platform.</CardDescription>
          {!isSignedIn && <p className="text-sm text-yellow-600 mt-2">Note: You are submitting as a guest. Sign in to track and manage your submissions.</p>}
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Idea Title</Label>
              <Input id="title" placeholder="Enter a catchy title for your idea" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your idea in detail. What problem does it solve? Who is it for?" className="min-h-[120px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image (Optional)</Label>
              <Input id="image" type="file" accept="image/*" />
              <p className="text-xs text-gray-500">Add an image to make your idea stand out. If no image is provided, a gradient background will be used.</p>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                Submit Idea
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
