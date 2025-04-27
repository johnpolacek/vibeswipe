import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Heart, TrendingUp, Users } from "lucide-react"

export function TrendingIdeas() {
  // Sample trending ideas with metrics (shortened list for homepage)
  const trendingIdeas = [
    {
      id: 1,
      title: "AI-Powered Personal Shopping Assistant",
      category: "E-commerce",
      likes: 342,
      matches: 78,
      isHot: true,
    },
    {
      id: 2,
      title: "Sustainable Food Delivery Platform",
      category: "Food Tech",
      likes: 287,
      matches: 62,
      isHot: true,
    },
    {
      id: 6,
      title: "Carbon Footprint Tracker for Businesses",
      category: "Sustainability",
      likes: 187,
      matches: 39,
      isHot: true,
    },
  ]

  return (
    <section className="bg-green-50 py-12 md:py-20">
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
            <Card key={idea.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold">{idea.title}</h3>
                  {idea.isHot && <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">🔥 Hot</span>}
                </div>
                <Badge variant="outline" className="bg-green-50 mb-4">
                  {idea.category}
                </Badge>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{idea.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span>{idea.matches} matches</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/20 p-4">
                <Link href={`/idea/${idea.id}`} className="w-full">
                  <Button size="sm" className="w-full bg-green-500 hover:bg-green-600">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
