import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowUpRight, Heart, MessageCircle, Star, TrendingUp, Users } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTrendingIdeas } from "@/lib/data"

export function TrendingView() {
  const trendingIdeas = getTrendingIdeas()

  // Generate a gradient based on the idea's id
  const getGradient = (id: number) => {
    const gradients = [
      "from-pink-500 to-purple-500",
      "from-blue-500 to-teal-500",
      "from-green-500 to-emerald-500",
      "from-yellow-500 to-orange-500",
      "from-purple-500 to-indigo-500",
      "from-red-500 to-pink-500",
    ]
    return gradients[id % gradients.length]
  }

  return (
    <div className="container max-w-6xl px-4 py-12 md:px-6 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 flex items-center justify-center gap-2">
          <TrendingUp className="text-primary" />
          <span>
            Trending <span className="text-primary">Ideas</span>
          </span>
        </h1>
        <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Discover the hottest startup ideas that are gaining traction across our community.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Tabs defaultValue="all" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Time</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="likes">Most Liked</SelectItem>
              <SelectItem value="matches">Most Matches</SelectItem>
              <SelectItem value="comments">Most Discussed</SelectItem>
              <SelectItem value="growth">Fastest Growing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trendingIdeas.map((idea) => (
          <Card key={idea.id} className="overflow-hidden">
            {idea.imageUrl ? (
              <div className="relative aspect-[9/16] w-full max-h-[300px]">
                <Image src={idea.imageUrl || "/placeholder.svg"} alt={idea.title} fill className="object-cover" />
              </div>
            ) : (
              <div className={`aspect-[9/16] w-full max-h-[300px] bg-gradient-to-br ${getGradient(idea.id)}`} />
            )}
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{idea.title}</h3>
                {idea.isHot && <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">🔥 Hot</span>}
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{idea.description}</p>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{idea.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>{idea.matches} matches</span>
                </div>
                {idea.growth && (
                  <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                    <ArrowUpRight className="h-3 w-3" />
                    {idea.growth}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button variant="outline" size="sm">
                <Star className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                <MessageCircle className="mr-2 h-4 w-4" />
                Discuss
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline" size="lg" className="gap-2">
          Load More
          <TrendingUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
