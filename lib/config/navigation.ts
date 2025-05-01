export const navItems = [
  {
    title: "Explore",
    href: "/explore",
  },
  {
    title: "Matches",
    href: "/matches",
  },
  {
    title: "Hackathons",
    href: "https://vibecode.party",
  },
] as const

export type NavItem = (typeof navItems)[number] 