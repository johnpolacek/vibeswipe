"use server"

import { recordIdeaSwipe } from "@/lib/services/visits";

export async function saveIdeaSwipe({
  userId,
  ideaId,
  liked,
  createdAt,
}: {
  userId: string;
  ideaId: string;
  liked: boolean;
  createdAt: number;
}) {
  try {
    const result = await recordIdeaSwipe({ userId, ideaId, liked, createdAt });
    return { success: true, id: result };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
} 