import { AgentRuntime, elizaLogger, settings, ModelProviderName } from "@elizaos/core";
import { TwitterClientInterface } from "@elizaos/client-twitter";
import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import uniquafyAction from "./actions/uniquafy.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
config();

async function startAgent() {
  try {
    elizaLogger.info("Starting Uniqua Twitter Agent...");

    // Load character file
    const characterPath = path.join(__dirname, "../characters/uniqua.json");
    
    if (!fs.existsSync(characterPath)) {
      throw new Error(`Character file not found at ${characterPath}`);
    }

    const characterData = JSON.parse(fs.readFileSync(characterPath, "utf-8"));
    elizaLogger.info(`Loaded character: ${characterData.name}`);

    // Validate required environment variables
    const requiredEnvVars = [
      "TWITTER_USERNAME",
      "TWITTER_PASSWORD",
      "TWITTER_EMAIL",
      "GOOGLE_GENERATIVE_AI_API_KEY",
      "GOOGLE_PROJECT_ID",
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingEnvVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingEnvVars.join(", ")}\n` +
        `Please check your .env file. See .env.example for reference.`
      );
    }

    // Configure settings
    const agentSettings = {
      ...settings,
      TWITTER_USERNAME: process.env.TWITTER_USERNAME,
      TWITTER_PASSWORD: process.env.TWITTER_PASSWORD,
      TWITTER_EMAIL: process.env.TWITTER_EMAIL,
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
      GOOGLE_LOCATION: process.env.GOOGLE_LOCATION || "us-central1",
    };

    // Create runtime
    const runtime = new AgentRuntime({
      databaseAdapter: null, // Use default in-memory adapter
      token: process.env.OPENAI_API_KEY || "",
      serverUrl: "https://api.openai.com/v1",
      actions: [uniquafyAction],
      evaluators: [],
      providers: [],
      character: characterData,
      plugins: [],
      modelProvider: characterData.modelProvider as ModelProviderName || "google",
      settings: agentSettings,
    });

    elizaLogger.success("Runtime created successfully");

    // Initialize Twitter client
    elizaLogger.info("Initializing Twitter client...");
    
    // Start the Twitter client
    const twitterClient = await TwitterClientInterface.start(runtime);
    
    if (!twitterClient) {
      throw new Error("Failed to initialize Twitter client");
    }

    elizaLogger.success("Twitter client initialized successfully");
    elizaLogger.success("🌸🐞 Uniqua is now live and ready to uniquafy! ✨");
    elizaLogger.info("Listening for mentions with 'uniquafy me'...");

    // Keep the process running
    process.on("SIGINT", () => {
      elizaLogger.info("Shutting down gracefully...");
      process.exit(0);
    });

  } catch (error) {
    elizaLogger.error("Failed to start agent:", error);
    process.exit(1);
  }
}

// Start the agent
startAgent().catch((error) => {
  elizaLogger.error("Unhandled error:", error);
  process.exit(1);
});
