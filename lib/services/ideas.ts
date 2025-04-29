import { convex, api } from "@/lib/convex/server";

export async function recordIdeaSwipe(data: {
  ideaId: string;
  userId: string;
  liked: boolean;
  createdAt: number;
}) {
  return await convex.mutation(api.ideas.recordSwipe, data);
}

export async function getUserSwipedIdeaIds(userId: string) {
  return await convex.query(api.ideas.getUserSwipedIdeaIds, { userId });
}

export async function getUserMatches(userId: string) {
  return await convex.query(api.ideas.getUserMatches, { userId });
} 