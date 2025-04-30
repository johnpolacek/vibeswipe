import { mutation } from "./_generated/server";

// Export the seed data so it can be used by other modules
export const seedIdeas = [
  {
    name: "MoodTunes",
    description: "A music player that generates playlists based on your current mood using AI emotion detection.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    srcUrl: "https://github.com/example/moodtunes",
  },
  {
    name: "PlantPal",
    description: "An app that helps you care for your houseplants with reminders, watering schedules, and plant identification.",
    imageUrl: "https://images.unsplash.com/photo-1628246498566-c846ce32a5b5",
    srcUrl: "https://github.com/example/plantpal",
  },
  {
    name: "VibeSwipe",
    description: "Swipe through creative project ideas and vibe the ones you love. Like Tinder, but for side projects!",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    srcUrl: "https://github.com/example/vibeswipe",
  },
  {
    name: "Recipe Remix",
    description: "Input your pantry ingredients and get AI-generated creative recipes you can cook tonight.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    srcUrl: "https://github.com/example/reciperemix",
  },
  {
    name: "Focus Forest",
    description: "A productivity timer that grows a virtual forest as you stay focused. Lose focus, lose trees!",
    imageUrl: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
    srcUrl: "https://github.com/example/focusforest",
  },
  {
    name: "TravelBack",
    description: "See what your city looked like 100 years ago with historical map overlays and photos.",
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    srcUrl: "https://github.com/example/travelback",
  },
  {
    name: "PetMatch",
    description: "Find your perfect pet match by swiping through adoptable pets from local shelters.",
    imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
    srcUrl: "https://github.com/example/petmatch",
  },
];

export const seed = mutation({
  args: {},
  handler: async (ctx, args) => {
    // Only seed if there are no ideas yet
    const existing = await ctx.db.query("ideas").first();
    if (existing) {
      console.log("Ideas already seeded.");
      return;
    }

    // Insert all ideas with timestamps
    for (const idea of seedIdeas) {
      await ctx.db.insert("ideas", {
        ...idea,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
    console.log("Seeded ideas.");
  },
}); 