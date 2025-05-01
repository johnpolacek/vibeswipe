import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserMatches } from "@/lib/services/ideas"
import { auth } from "@clerk/nextjs/server"
import { SignInButton } from "@clerk/nextjs"
import { getGradient } from "@/lib/utils"
import { CopyPromptButtons } from "@/components/copy-prompt-buttons"
import { Toaster } from "sonner"

export async function MatchesView() {
  const { userId } = await auth()

  if (!userId) {
    return (
      <div className="container max-w-4xl px-4 py-12 md:px-6 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Your <span className="text-primary">Matches</span>
          </h1>
          <p className="max-w-[600px] text-balance mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Sign in to see your matched ideas and start exploring.</p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardContent className="flex flex-col items-center gap-6 py-10">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Sign in to see your matches</h2>
                <p className="text-muted-foreground">Create an account to swipe, save, and unlock the full experience.</p>
              </div>
              <SignInButton mode="modal">
                <Button size="lg" className="w-full max-w-xs">
                  Sign up / Sign in
                </Button>
              </SignInButton>
              <div className="flex items-center w-full max-w-xs gap-2">
                <div className="flex-1 h-px bg-muted" />
                <span className="text-muted-foreground text-xs">or</span>
                <div className="flex-1 h-px bg-muted" />
              </div>
              <Link href="/explore">
                <Button size="lg" variant="outline" className="w-full max-w-xs">
                  Explore Ideas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const matchedIdeas = await getUserMatches(userId)

  return (
    <div className="container max-w-4xl px-4 py-12 md:px-6 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
          Your <span className="text-primary">Matches</span>
        </h1>
        <p className="max-w-[600px] text-balance mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Ideas you&apos;ve matched with. Use the prompts to generate a PRD or get development guidance.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="grid gap-6 md:grid-cols-2">
            {matchedIdeas.map((idea) => (
              <Card className="pt-0 overflow-hidden" key={idea._id}>
                {idea.imageUrl ? (
                  <div className="relative aspect-[9/16] w-full max-h-[200px]">
                    <Image src={idea.imageUrl || "/placeholder.svg"} alt={idea.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className={`aspect-[9/16] w-full max-h-[200px] bg-gradient-to-br ${getGradient(idea._id)}`} />
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{idea.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="-mt-4">
                  <p className="text-gray-600 line-clamp-3">{idea.description}</p>
                </CardContent>
                <CardFooter>
                  <CopyPromptButtons idea={idea} />
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
      </div>
      <Toaster richColors closeButton position="top-center" />
    </div>
  )
}
