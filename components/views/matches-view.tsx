import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Star, Users } from "lucide-react"
import { getMatchedIdeas, getSavedIdeas } from "@/lib/data"

export function MatchesView() {
  const matchedIdeas = getMatchedIdeas()
  const savedIdeas = getSavedIdeas()

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
    <div className="container max-w-4xl px-4 py-12 md:px-6 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          Your <span className="text-green-500">Matches</span> & Saved Ideas
        </h1>
        <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Connect with potential co-founders and explore ideas you&apos;ve saved.</p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Your Matches</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {matchedIdeas.map((idea) => (
              <Card key={idea.id}>
                {idea.imageUrl ? (
                  <div className="relative aspect-[9/16] w-full max-h-[200px]">
                    <Image src={idea.imageUrl || "/placeholder.svg"} alt={idea.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className={`aspect-[9/16] w-full max-h-[200px] bg-gradient-to-br ${getGradient(Number(idea.id))}`} />
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{idea.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{idea.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    View Matches
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Discuss
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {matchedIdeas.length === 0 && (
            <Card className="p-6 text-center">
              <p className="text-gray-500 mb-4">You don&apos;t have any matches yet.</p>
              <Link href="/explore">
                <Button className="bg-green-500 hover:bg-green-600">Start Swiping</Button>
              </Link>
            </Card>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Saved Ideas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {savedIdeas.map((idea) => (
              <Card key={idea.id}>
                {idea.imageUrl ? (
                  <div className="relative aspect-[9/16] w-full max-h-[200px]">
                    <Image src={idea.imageUrl || "/placeholder.svg"} alt={idea.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className={`aspect-[9/16] w-full max-h-[200px] bg-gradient-to-br ${getGradient(Number(idea.id))}`} />
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{idea.title}</CardTitle>
                    <Button variant="ghost" size="icon" className="text-yellow-500">
                      <Star className="fill-yellow-500" size={20} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{idea.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Discuss
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {savedIdeas.length === 0 && (
            <Card className="p-6 text-center">
              <p className="text-gray-500 mb-4">You haven&apos;t saved any ideas yet.</p>
              <Link href="/explore">
                <Button className="bg-green-500 hover:bg-green-600">Explore Ideas</Button>
              </Link>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
