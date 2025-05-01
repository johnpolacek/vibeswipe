"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navItems } from "@/lib/config/navigation"
import { GalleryHorizontalEnd } from "lucide-react"

interface MainNavProps {
  isAdmin: boolean
}

export function MainNav({ isAdmin }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex md:gap-6 items-center">
      <Link href="/" className="mr-4">
        <div className="flex items-center">
          <GalleryHorizontalEnd className="w-6 h-6 text-primary mr-3" />
          <span className="text-2xl tracking-wide font-extrabold text-primary">Vibe</span>
          <span className="text-2xl tracking-wide font-extrabold">Swipe</span>
        </div>
      </Link>

      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={cn("text-sm mt-1 font-medium transition-colors hover:text-primary", pathname === item.href ? "text-primary" : "text-muted-foreground")}>
          {item.title}
        </Link>
      ))}

      {isAdmin && (
        <Link href="/admin" className={cn("text-sm mt-1 font-medium transition-colors hover:text-primary", pathname?.startsWith("/admin") ? "text-primary" : "text-muted-foreground")}>
          Admin
        </Link>
      )}
    </nav>
  )
}
