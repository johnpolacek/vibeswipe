import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-16 bg-gradient-to-b from-background via-primary/5 to-primary/20 overflow-hidden">
      {/* Ultra-dense ocean wavy lines SVG background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
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
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center max-w-5xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Find Your Next <span className="text-primary font-extrabold tracking-wide">Vibe</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Swipe through project ideas, vibe the ones you love.</p>
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
            <div className="relative w-[300px] h-[450px] md:w-[350px] md:h-[525px] rounded-xl shadow-xl overflow-hidden border">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/80 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M12 2v4" />
                      <path d="M12 18v4" />
                      <path d="M4.93 4.93l2.83 2.83" />
                      <path d="M16.24 16.24l2.83 2.83" />
                      <path d="M2 12h4" />
                      <path d="M18 12h4" />
                      <path d="M4.93 19.07l2.83-2.83" />
                      <path d="M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Matchmaking</h3>
                  <p className="mt-2 text-white">Our algorithm learns your preferences to show you ideas you&apos;ll love</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
