import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a more readable format
 * @param dateString ISO date string
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

// Deterministic seeded random for a string
export function seededRandom(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash) / 2147483647
}

// Generate a random gradient based on a string id
export function getGradient(id: string) {
  const gradients = [
    "from-pink-500 to-purple-500",
    "from-blue-500 to-teal-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500",
    "from-purple-500 to-indigo-500",
    "from-red-500 to-pink-500",
    "from-fuchsia-500 to-cyan-500",
    "from-lime-500 to-green-700",
    "from-amber-500 to-orange-700",
    "from-sky-500 to-blue-700",
  ]
  const rand = seededRandom(id)
  return gradients[Math.floor(rand * gradients.length)]
}
