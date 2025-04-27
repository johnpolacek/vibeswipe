"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { GalleryHorizontalEnd, Menu, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { navItems } from "@/lib/config/navigation"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const pathname = usePathname()
  const { user, isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    // Check if the user is an admin when the component mounts or user changes
    const checkAdminStatus = async () => {
      if (!isLoaded || !isSignedIn || !user?.id) {
        setIsAdmin(false)
        return
      }

      try {
        // Fetch admin status from the server
        const response = await fetch("/api/check-admin")
        if (response.ok) {
          const data = await response.json()
          setIsAdmin(data.isAdmin)
        } else {
          setIsAdmin(false)
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        setIsAdmin(false)
      }
    }

    checkAdminStatus()
  }, [isLoaded, isSignedIn, user?.id])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex items-center gap-1 pl-3 pt-3">
          <GalleryHorizontalEnd className="w-5 h-5 text-primary mr-1" />
          <span className="text-xl tracking-wide font-extrabold text-primary">Startup</span>
          <span className="text-xl tracking-wide font-extrabold">Swiper</span>
        </div>
        <nav className="mt-6 flex flex-col gap-4 pl-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === item.href ? "text-primary" : "text-muted-foreground")}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          {/* Admin link - only visible to admin users */}
          {isAdmin && (
            <Link
              href="/admin"
              className={cn("text-lg font-medium transition-colors hover:text-primary flex items-center gap-2", pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground")}
              onClick={() => setOpen(false)}
            >
              <ShieldCheck className="h-5 w-5" />
              Admin
            </Link>
          )}
        </nav>
        <div className="mt-auto flex flex-col gap-4 p-8">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button className="w-full" onClick={() => setOpen(false)}>
                Sign Up
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center justify-center">
              <UserButton afterSignOutUrl="/" userProfileUrl="/settings/profile" />
            </div>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  )
}
