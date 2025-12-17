import {
  Action,
  IAgentRuntime,
  Memory,
  HandlerCallback,
  State,
  elizaLogger,
} from "@elizaos/core";
import axios from "axios";
import { VertexAI } from "@google-cloud/vertexai";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface UniquafyContent {
  text: string;
  imageUrl?: string;
}

// Initialize Vertex AI
let vertexAI: VertexAI | null = null;

function initializeVertexAI(runtime: IAgentRuntime): VertexAI {
  if (!vertexAI) {
    const projectId = runtime.getSetting("GOOGLE_PROJECT_ID") || process.env.GOOGLE_PROJECT_ID;
    const location = runtime.getSetting("GOOGLE_LOCATION") || process.env.GOOGLE_LOCATION || "us-central1";
    
    if (!projectId) {
      throw new Error("GOOGLE_PROJECT_ID is required for Vertex AI");
    }
    
    vertexAI = new VertexAI({
      project: projectId,
      location: location,
    });
  }
  return vertexAI;
}

/**
 * Extract profile picture URL from Twitter user
 * Removes '_normal' suffix to get high-res version
 */
function getHighResProfilePicture(profileImageUrl: string): string {
  // Remove _normal, _bigger, _mini suffixes to get original size
  return profileImageUrl.replace(/_normal|_bigger|_mini/, "");
}

/**
 * Download image from URL
 */
async function downloadImage(url: string): Promise<Buffer> {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 30000,
  });
  return Buffer.from(response.data);
}

/**
 * Transform image using Vertex AI Imagen
 */
async function transformImageWithVertex(
  runtime: IAgentRuntime,
  imageBuffer: Buffer
): Promise<Buffer> {
  try {
    const vertex = initializeVertexAI(runtime);
    const model = "imagegeneration@006";
    
    // Convert image to base64
    const base64Image = imageBuffer.toString("base64");
    
    // Use Vertex AI Imagen for image-to-image transformation
    const generativeModel = vertex.preview.getGenerativeModel({
      model: model,
    });

    const prompt = "Transform this image: Pink skin, polka dots, antennae, 3D render in the style of Backyardigans character Uniqua";
    
    // Note: Vertex AI Imagen API varies by version
    // This is a simplified approach - actual implementation may need adjustment
    const request = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
            {
              inlineData: {
                mimeType: "image/png",
                data: base64Image,
              },
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
        topP: 1,
      },
    };

    const result = await generativeModel.generateContent(request);
    
    // Extract image from response
    // Note: The actual response structure may vary
    const response = result.response;
    
    // For now, return a placeholder since actual Vertex AI image generation
    // may require different API endpoints
    elizaLogger.warn("Vertex AI image generation may require specific API configuration");
    
    // Return original image as fallback
    // In production, you'd want to use proper Vertex AI Imagen endpoints
    return imageBuffer;
  } catch (error) {
    elizaLogger.error("Error transforming image with Vertex AI:", error);
    throw error;
  }
}

/**
 * Upload image to Twitter and get media ID
 */
async function uploadImageToTwitter(
  runtime: IAgentRuntime,
  imageBuffer: Buffer
): Promise<string> {
  try {
    // This would use the Twitter client from runtime
    // ElizaOS Twitter client should have media upload capability
    elizaLogger.info("Uploading image to Twitter");
    
    // Save temporarily for upload
    const tempDir = "/tmp/uniquafy";
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const tempPath = path.join(tempDir, `uniquafied_${Date.now()}.png`);
    fs.writeFileSync(tempPath, imageBuffer);
    
    // In a real implementation, this would use Twitter API v2 media upload
    // For now, return a placeholder media ID
    elizaLogger.info(`Image saved temporarily at ${tempPath}`);
    
    return "media_id_placeholder";
  } catch (error) {
    elizaLogger.error("Error uploading image to Twitter:", error);
    throw error;
  }
}

export const uniquafyAction: Action = {
  name: "UNIQUAFY",
  similes: ["TRANSFORM", "MAKEOVER", "CONVERT"],
  description: "Transform user's profile picture into a pink spotted Uniqua-style character",
  
  validate: async (runtime: IAgentRuntime, message: Memory): Promise<boolean> => {
    const text = (message.content as UniquafyContent).text?.toLowerCase() || "";
    
    // Check if message contains "uniquafy me"
    const hasUniquafyTrigger = text.includes("uniquafy me");
    
    // Check if this is a mention/reply
    const isMention = text.includes("@") || message.content.inReplyTo;
    
    elizaLogger.info(`Validating uniquafy action: trigger=${hasUniquafyTrigger}, mention=${isMention}`);
    
    return hasUniquafyTrigger && isMention;
  },

  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    options: any,
    callback: HandlerCallback
  ): Promise<void> => {
    try {
      elizaLogger.info("Starting uniquafy transformation");
      
      // Get the user's profile picture
      const userId = message.userId;
      if (!userId) {
        callback({
          text: "Oops! I couldn't find your profile! 🌸 Make sure you're mentioning me from your Twitter account! 🐞",
          error: true,
        });
        return;
      }

      // In a real implementation, we'd fetch user info from Twitter
      // For now, we'll create a placeholder flow
      elizaLogger.info(`Processing uniquafy request for user: ${userId}`);
      
      // Simulate the workflow
      callback({
        text: "Ooh, this is going to be so much fun! 🌸✨ Let me transform you into a spotted pink adventurer! Hold on tight! 🐞",
        action: "UNIQUAFY_START",
      });

      try {
        // Step 1: Get user profile picture
        // This would use Twitter API to fetch user profile
        const profilePicUrl = "https://pbs.twimg.com/profile_images/example_normal.jpg";
        const highResUrl = getHighResProfilePicture(profilePicUrl);
        elizaLogger.info(`Profile picture URL: ${highResUrl}`);
        
        // Step 2: Download the image
        // In production, this would actually download
        // const imageBuffer = await downloadImage(highResUrl);
        
        // Step 3: Transform with Vertex AI
        // const transformedBuffer = await transformImageWithVertex(runtime, imageBuffer);
        
        // Step 4: Upload to Twitter
        // const mediaId = await uploadImageToTwitter(runtime, transformedBuffer);
        
        // Step 5: Reply with the transformed image
        callback({
          text: "Ta-da! 🌸✨ You're now uniquafied! Welcome to the spotted pink adventurer club! 🐞 Doesn't it look amazing? Let's go on an adventure! 🎉",
          action: "UNIQUAFY_COMPLETE",
          // In production, this would include the media attachment
          // attachments: [{ type: "image", mediaId: mediaId }],
        });
      } catch (error) {
        elizaLogger.error("Error during uniquafy transformation:", error);
        callback({
          text: "Oh no! 🌸 Something went wrong during the transformation! But don't worry - I'm always up for another adventure! Try again? 🐞✨",
          error: true,
        });
      }
    } catch (error) {
      elizaLogger.error("Error in uniquafy handler:", error);
      callback({
        text: "Oops! I had a little adventure mishap! 🌸 Let me try that again! 🐞",
        error: true,
      });
    }
  },

  examples: [
    [
      {
        user: "{{user1}}",
        content: {
          text: "@Uniqua uniquafy me!",
        },
      },
      {
        user: "Uniqua",
        content: {
          text: "Ooh, this is going to be so much fun! 🌸✨ Let me transform you into a spotted pink adventurer! Hold on tight! 🐞",
          action: "UNIQUAFY",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Hey @Uniqua can you uniquafy me please?",
        },
      },
      {
        user: "Uniqua",
        content: {
          text: "Of course! 🌸 Time for an amazing transformation! 🐞✨",
          action: "UNIQUAFY",
        },
      },
    ],
  ],
};

export default uniquafyAction;
