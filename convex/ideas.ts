import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageUrl: v.optional(v.string()),
    srcUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("ideas", args);
    return id;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("ideas").order("desc").collect();
  },
});

export const recordSwipe = mutation({
  args: {
    ideaId: v.string(),
    userId: v.string(),
    liked: v.boolean(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Upsert: if a swipe exists for this user/idea, update it; otherwise, insert
    const existing = await ctx.db
      .query("idea_swipes")
      .withIndex("by_idea_user", q => q.eq("ideaId", args.ideaId).eq("userId", args.userId))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        liked: args.liked,
        createdAt: args.createdAt,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("idea_swipes", args);
    }
  },
});

export const getUserSwipedIdeaIds = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const swipes = await ctx.db
      .query("idea_swipes")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .collect();
    return swipes.map(s => s.ideaId);
  },
}); 