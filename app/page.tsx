import { HomeView } from "@/components/views/home-view"

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-green-100/10">
      <HomeView />
    </div>
  )
}
