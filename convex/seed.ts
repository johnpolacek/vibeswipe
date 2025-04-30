import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx, args) => {
    // Only seed if there are no ideas yet
    const existing = await ctx.db.query("ideas").first();
    if (existing) {
      console.log("Ideas already seeded.");
      return;
    }

    const ideas = [
      {
        name: "MoodTunes",
        description: "A music player that generates playlists based on your current mood using AI emotion detection.",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        srcUrl: "https://github.com/example/moodtunes",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "PlantPal",
        description: "An app that helps you care for your houseplants with reminders, watering schedules, and plant identification.",
        imageUrl: "https://images.unsplash.com/photo-1628246498566-c846ce32a5b5",
        srcUrl: "https://github.com/example/plantpal",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "VibeSwipe",
        description: "Swipe through creative project ideas and vibe the ones you love. Like Tinder, but for side projects!",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        srcUrl: "https://github.com/example/vibeswipe",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Recipe Remix",
        description: "Input your pantry ingredients and get AI-generated creative recipes you can cook tonight.",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        srcUrl: "https://github.com/example/reciperemix",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Focus Forest",
        description: "A productivity timer that grows a virtual forest as you stay focused. Lose focus, lose trees!",
        imageUrl: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
        srcUrl: "https://github.com/example/focusforest",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "TravelBack",
        description: "See what your city looked like 100 years ago with historical map overlays and photos.",
        imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        srcUrl: "https://github.com/example/travelback",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "PetMatch",
        description: "Find your perfect pet match by swiping through adoptable pets from local shelters.",
        imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
        srcUrl: "https://github.com/example/petmatch",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    // Insert all ideas
    for (const idea of ideas) {
      await ctx.db.insert("ideas", idea);
    }
    console.log("Seeded ideas.");
  },
}); 