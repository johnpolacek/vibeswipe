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
export function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
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
  // Hash the ID to get a consistent gradient
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i)
    hash = hash & hash
  }

  // Use the hash to select from predefined gradients
  const gradients = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-yellow-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-red-500 to-orange-500",
    "from-teal-500 to-green-500",
    "from-pink-500 to-rose-500",
  ]

  const index = Math.abs(hash) % gradients.length
  return gradients[index]
}
