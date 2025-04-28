import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroIdeaPreview } from "@/components/hero-idea-preview"

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-16 bg-gradient-to-b from-background via-primary/5 to-primary/20 overflow-hidden">
      {/* Ultra-dense ocean wavy lines SVG background */}
      <div className="absolute -top-4 left-0 w-full h-full pointer-events-none z-0 opacity-40">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <g stroke="#38bdf8" strokeWidth="0.7" opacity="0.18">
            {Array.from({ length: 60 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${1 + i} Q 30 ${-1 + i} 60 ${1 + i} T 120 ${1 + i} T 180 ${1 + i} T 240 ${1 + i} T 300 ${1 + i} T 360 ${1 + i} T 420 ${1 + i} T 480 ${1 + i} T 540 ${1 + i} T 600 ${1 + i} T 660 ${1 + i} T 720 ${1 + i} T 780 ${1 + i} T 840 ${1 + i} T 900 ${1 + i} T 960 ${1 + i} T 1020 ${1 + i} T 1080 ${1 + i} T 1140 ${1 + i} T 1200 ${1 + i} T 1260 ${1 + i} T 1320 ${1 + i} T 1380 ${1 + i} T 1440 ${1 + i}`}
              />
            ))}
          </g>
        </svg>
      </div>
      {/* End ultra-dense ocean wavy lines SVG background */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 items-center max-w-6xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-3xl font-medium tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Next <span className="text-primary font-extrabold tracking-wide">Vibe</span>
            </h1>
            <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Swipe through project ideas, vibe the ones you love.</p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/explore">
                <Button size="lg">Start Swiping</Button>
              </Link>
              <Link href="/submit">
                <Button size="lg" variant="outline">
                  Submit an Idea
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <HeroIdeaPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
