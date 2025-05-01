import { FaDiscord, FaReddit } from "react-icons/fa"
import { Heading } from "../typography/heading"
import Link from "next/link"
import { Mail } from "lucide-react"

export function CommunitySection() {
  return (
    <section className="container flex items-center justify-center flex-col gap-4 py-16">
      <Heading variant="h3">Vibecoding Community</Heading>
      <p className="text-gray-700 mb-4">At vibecode.party, we’re all about coders, creators, and AI enthusiasts building cool stuff together and learning from each other.</p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12">
        <a
          href="https://discord.gg/vibecode"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity"
        >
          <FaDiscord className="w-5 h-5" />
          Join our Discord
        </a>
        <a
          href="https://reddit.com/r/vibecoding"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:opacity-90 transition-opacity"
        >
          <FaReddit className="w-5 h-5" />
          Join r/vibecoding
        </a>
        <a
          href="https://x.com/vibecodeparty"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-2 bg-black text-white rounded-md hover:opacity-90 transition-opacity"
        >
          <span className="text-xl">𝕏 </span>
          Follow
        </a>
      </div>
    </section>
  )
}
