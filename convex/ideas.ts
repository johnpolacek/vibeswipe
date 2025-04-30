import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

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

export const getUserMatches = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Get all liked swipes for this user
    const swipes = await ctx.db
      .query("idea_swipes")
      .withIndex("by_user", q => q.eq("userId", args.userId))
      .filter(q => q.eq(q.field("liked"), true))
      .collect();

    // Get all the ideas that were liked
    const matchedIdeas = await Promise.all(
      swipes.map(async (swipe) => {
        const idea = await ctx.db.get(swipe.ideaId as Id<"ideas">);
        if (!idea) return null;
        return {
          ...idea,
          swipedAt: swipe.createdAt,
        };
      })
    );

    // Filter out any null values and sort by most recently swiped
    return matchedIdeas
      .filter((idea): idea is NonNullable<typeof idea> => idea !== null)
      .sort((a, b) => b.swipedAt - a.swipedAt);
  },
});

export const getAllIdeas = query({
  args: {
    paginationOpts: v.optional(
      v.object({
        cursor: v.optional(v.string()),
        numItems: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const query = ctx.db.query("ideas").order("desc");
    
    if (args.paginationOpts) {
      const { cursor, numItems } = args.paginationOpts;
      const paginatedResults = await query.paginate({ cursor: cursor ?? null, numItems });
      
      return {
        ideas: paginatedResults.page,
        nextCursor: paginatedResults.continueCursor,
      };
    }

    return {
      ideas: await query.collect(),
      nextCursor: null,
    };
  },
});

export const getTotalCount = query({
  args: {},
  handler: async (ctx) => {
    const ideas = await ctx.db.query("ideas").collect();
    return ideas.length;
  },
});

// Define the idea input type
const ideaInput = v.object({
  name: v.string(),
  description: v.string(),
  imageUrl: v.optional(v.string()),
  srcUrl: v.optional(v.string()),
});

export const importIdeas = mutation({
  args: {
    ideas: v.array(
      v.object({
        name: v.string(),
        description: v.string(),
        imageUrl: v.optional(v.string()),
        srcUrl: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Insert each idea
    for (const idea of args.ideas) {
      await ctx.db.insert("ideas", {
        ...idea,
        createdAt: now,
        updatedAt: now,
      });
    }
    
    return args.ideas.length;
  },
});

export const updateIdea = mutation({
  args: {
    id: v.id("ideas"),
    update: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const { id, update } = args;
    await ctx.db.patch(id, {
      ...update,
      updatedAt: Date.now(),
    });
    return id;
  },
}); 