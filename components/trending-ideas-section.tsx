import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Heart, TrendingUp } from "lucide-react"
import { getTrendingIdeas } from "@/lib/data"

export function TrendingIdeasSection() {
  // Get top 3 trending ideas for homepage
  const trendingIdeas = getTrendingIdeas(3)

  return (
    <section className="bg-gradient-to-b from-background to-transparent py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="text-primary" />
              Trending Ideas
            </h2>
            <p className="text-gray-500 mt-2">See what&apos;s hot in the startup community right now</p>
          </div>
          <Link href="/trending">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Trending
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trendingIdeas.map((idea) => (
            <Card key={idea.id} className="overflow-hidden pt-0">
              {idea.imageUrl ? (
                <div className="relative aspect-[9/16] w-full max-h-[300px]">
                  <Image src={idea.imageUrl || "/placeholder.svg"} alt={idea.title} fill className="object-cover" />
                </div>
              ) : (
                <div className={`aspect-[9/16] w-full max-h-[300px] bg-gradient-to-br from-primary/90 to-primary/70`} />
              )}
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold">{idea.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{idea.description}</p>
                <div className="flex justify-between text-sm">
                  {typeof idea.likeCount === "number" && (
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{idea.likeCount} likes</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/20 pb-4 flex justify-center w-full">
                <Link href={`/idea/${idea.id}`}>
                  <Button className="px-8 h-auto py-3 bg-primary hover:bg-primary/90">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
