export const navItems = [
  {
    title: "Explore",
    href: "/explore",
  },
  {
    title: "Matches",
    href: "/matches",
  },
] as const

export type NavItem = (typeof navItems)[number] 