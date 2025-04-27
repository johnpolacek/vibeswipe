export const siteConfig = {
  title: "VibeSwipe",
  description: "Swipe through project ideas, vibe the ones you love",
  shortDescription: "Swipe through project ideas, vibe the ones you love",
  url: "vibeswipe.vercel.app",
  shareImage: "",
  x: "johnpolacek",
  github: "https://github.com/johnpolacek/vibeswipe",
  logo: ""
} as const

export type SiteConfig = {
    title: string
    description: string
    shortDescription: string
    url: string
    shareImage: string
    x: string
    github: string
    logo: string
}