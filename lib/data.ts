export interface StartupIdea {
  id: string  // Changed to string to use UUID or similar
  title: string
  description: string
  imageUrl?: string
  submitterId?: string
  createdAt: Date
  srcUrl?: string
  // These will be computed from SwipeActions
  likeCount?: number
  passCount?: number
  superLikeCount?: number
}

export type SwipeType = 'like' | 'pass' | 'superlike'

export interface SwipeAction {
  id: string
  userId: string
  ideaId: string
  type: SwipeType
  createdAt: Date
}

// Sample startup ideas
export const startupIdeas: StartupIdea[] = [
  {
    id: "1",
    title: "AI-Powered Personal Shopping Assistant",
    description:
      "An app that uses AI to recommend products based on user preferences and browsing history. The assistant learns from your shopping habits and provides personalized recommendations that improve over time. It can also alert you to sales on items you might like and help you find the best deals across multiple platforms.",
    imageUrl: "/placeholder.svg?height=800&width=450",
    submitterId: "user1",
    createdAt: new Date(),
    likeCount: 342,
    passCount: 0,
    superLikeCount: 0,
  },
  {
    id: "2",
    title: "Sustainable Food Delivery Platform",
    description:
      "A food delivery service focused on zero-waste packaging and carbon-neutral delivery. Partner with local restaurants that commit to sustainable practices and use electric vehicles or bicycles for delivery. Customers can track the carbon footprint saved with each order and earn rewards for sustainable choices.",
    submitterId: "user2",
    createdAt: new Date(),
    likeCount: 287,
    passCount: 0,
    superLikeCount: 0,
  },
  {
    id: "3",
    title: "Remote Team Building Platform",
    description:
      "Virtual team-building activities and games designed specifically for remote teams. The platform offers a variety of interactive experiences that help build camaraderie and improve communication among team members who may never meet in person. Activities are designed to be engaging across different time zones and cultural backgrounds.",
    imageUrl: "/placeholder.svg?height=800&width=450",
    submitterId: "user3",
    createdAt: new Date(),
    likeCount: 256,
    passCount: 0,
    superLikeCount: 0,
  },
  {
    id: "4",
    title: "Mental Health Tracking App",
    description:
      "An app that helps users track their mental health and provides personalized recommendations. Users can log their mood, sleep patterns, and daily activities to identify triggers and patterns. The app provides insights and suggests evidence-based techniques to improve mental wellbeing, connecting users with professional help when needed.",
    submitterId: "user4",
    createdAt: new Date(),
    likeCount: 231,
    passCount: 0,
    superLikeCount: 0,
  },
  {
    id: "5",
    title: "Peer-to-Peer Skill Exchange",
    description:
      "A platform where users can exchange skills and knowledge without monetary transactions. Users earn credits by teaching others what they know, which they can then spend to learn new skills from other users. This creates a community of lifelong learners who can develop personally and professionally without financial barriers.",
    imageUrl: "/placeholder.svg?height=800&width=450",
    submitterId: "user5",
    createdAt: new Date(),
    likeCount: 198,
    passCount: 0,
    superLikeCount: 0,
  },
  {
    id: "6",
    title: "Carbon Footprint Tracker for Businesses",
    description:
      "A platform that helps businesses track and reduce their carbon footprint with actionable insights. The software integrates with existing business systems to automatically calculate emissions from operations, supply chain, and employee activities. It then suggests targeted strategies to reduce impact and tracks progress toward sustainability goals.",
    submitterId: "user6",
    createdAt: new Date(),
    likeCount: 187,
    passCount: 0,
    superLikeCount: 0,
  },
]

// Get trending ideas
export function getTrendingIdeas(limit?: number): StartupIdea[] {
  const sorted = [...startupIdeas].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
  return limit ? sorted.slice(0, limit) : sorted
}

// Get matched ideas (sample)
export function getMatchedIdeas(): StartupIdea[] {
  return [startupIdeas[0], startupIdeas[3]]
}

// Get saved ideas (sample)
export function getSavedIdeas(): StartupIdea[] {
  return [startupIdeas[4]]
}
