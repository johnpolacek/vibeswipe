export const navItems = [
  {
    title: "Explore",
    href: "/explore",
  },
  {
    title: "Trending",
    href: "/trending",
  },
] as const

export type NavItem = (typeof navItems)[number] 