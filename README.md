# Uniquafy 🌸🐞

Mission Accepted! An AI Agent that 'Uniquafies' your Twitter profile picture. Send a mention, get a spotty pink makeover. Built with ElizaOS v0.1.7 + Google Vertex AI.

## About

Uniqua is an energetic and brave character from The Backyardigans who loves adventures and helping friends! This Twitter agent allows users to transform their profile pictures into pink spotted creatures inspired by Uniqua herself.

## Features

- 🐞 **Twitter Integration**: Monitors mentions for "uniquafy me" trigger phrase
- 🌸 **AI Image Transformation**: Uses Google Vertex AI for image-to-image generation
- ✨ **Backyardigans Persona**: Responds with Uniqua's energetic and brave personality
- 🎨 **Profile Picture Enhancement**: Extracts high-resolution profile pictures (removes `_normal` suffix)

## Prerequisites

- Node.js 18+ 
- Twitter account with API access (Basic tier)
- Google Cloud account with Vertex AI enabled
- Google Cloud Project with billing enabled

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mondb-dev/uniquafy.git
cd uniquafy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Twitter API Credentials (Basic)
TWITTER_USERNAME=your_twitter_username
TWITTER_PASSWORD=your_twitter_password
TWITTER_EMAIL=your_twitter_email

# Google Cloud Vertex AI
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
GOOGLE_PROJECT_ID=your_google_project_id
GOOGLE_LOCATION=us-central1
```

### 4. Twitter API Setup

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new project and app
3. Enable OAuth 1.0a with Read and Write permissions
4. Note your credentials (even Basic tier works for this use case)

### 5. Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Vertex AI API
4. Create a service account key or use your API key
5. Set up billing (required for Vertex AI)

### 6. Build the Project

```bash
npm run build
```

### 7. Run the Agent

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Usage

Once the agent is running, users can interact with Uniqua on Twitter:

1. Mention the bot: `@YourBotHandle uniquafy me!`
2. Uniqua will process the request and transform your profile picture
3. The bot will reply with the uniquafied image

## Project Structure

```
uniquafy/
├── characters/
│   └── uniqua.json          # Character personality and settings
├── src/
│   ├── actions/
│   │   └── uniquafy.ts      # Main action handler for image transformation
│   └── index.ts             # Entry point and agent initialization
├── .env.example             # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Character Configuration

The Uniqua character is configured in `characters/uniqua.json` with:
- **Model Provider**: Google (for Vertex AI integration)
- **Personality**: Energetic, brave, adventurous (Backyardigans style)
- **Trigger Phrase**: "uniquafy me"
- **Style**: Enthusiastic with frequent emoji usage 🌸🐞✨

## How It Works

1. **Mention Detection**: The bot monitors Twitter for mentions containing "uniquafy me"
2. **Profile Picture Extraction**: Fetches the user's profile picture and removes the `_normal` suffix for high resolution
3. **AI Transformation**: Sends the image to Google Vertex AI with the prompt: "Pink skin, polka dots, antennae, 3D render"
4. **Upload & Reply**: Uploads the transformed image to Twitter and replies to the user

## Development

### Building

```bash
npm run build
```

### Running in Dev Mode

```bash
npm run dev
```

## Troubleshooting

### Twitter Authentication Issues
- Ensure your Twitter credentials are correct
- Check that your account has API access
- Verify OAuth permissions are set correctly

### Google Vertex AI Issues
- Confirm billing is enabled on your Google Cloud project
- Verify the Vertex AI API is enabled
- Check that your project ID and location are correct
- Ensure you have sufficient quota for image generation

### Module Errors
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure you're using Node.js 18 or higher

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

Built with:
- [ElizaOS](https://github.com/elizaos/eliza) - AI agent framework
- [Google Vertex AI](https://cloud.google.com/vertex-ai) - Image generation
- Inspired by Uniqua from The Backyardigans 🌸🐞✨
