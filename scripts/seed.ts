import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function main() {
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  try {
    await client.mutation(api.seed.seed, {});
    console.log("✅ Successfully seeded the database");
  } catch (error) {
    console.error("❌ Failed to seed the database:", error);
  }
}

main(); 