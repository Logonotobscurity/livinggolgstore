# Google Gemini AI Setup Guide

## Installation Steps

### 1. Install the Correct Package

First, you need to install the Google Gemini AI package. Run this command:

```bash
npm install --save @genkit-ai/google-genai
```

If you have the old package installed, remove it first:
```bash
npm uninstall @genkit-ai/googleai
npm install --save @genkit-ai/google-genai
```

### 2. Get Your Google AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 3. Configure Environment Variables

Add your API key to `.env.local`:

```bash
# Create .env.local if it doesn't exist
cp .env.local.example .env.local
```

Then edit `.env.local` and add:
```
GOOGLE_GENAI_API_KEY=your-actual-api-key-here
```

### 4. Update Configuration (Already Done)

The `src/ai/genkit.ts` file has been updated to use the correct package:

```typescript
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-1.5-flash-latest',
});
```

### 5. Verify Installation

Run the setup check script:
```bash
node scripts/check-ai-setup.js
```

### 6. Test the AI Service

Start the development server:
```bash
npm run dev
```

Then test the AI consultant at http://localhost:9002

## Available Models

With Google Gemini AI, you can use these models:
- `googleai/gemini-1.5-flash-latest` (Fast, efficient - currently configured)
- `googleai/gemini-1.5-pro-latest` (Most capable)
- `googleai/gemini-1.0-pro` (Stable version)

## Troubleshooting

### Error: "Cannot find module '@genkit-ai/google-genai'"
Solution: Run `npm install @genkit-ai/google-genai`

### Error: "API key not valid"
Solution: 
1. Check that your API key is correctly set in `.env.local`
2. Ensure no extra spaces or quotes around the key
3. Verify the key is active in Google AI Studio

### Error: "Model not found"
Solution: Update to a valid model name in `src/ai/genkit.ts`

## API Limits

Google Gemini AI has rate limits:
- Free tier: 60 requests per minute
- Consider implementing caching for production use

## Next Steps

After installation:
1. Test the AI consultant feature
2. Monitor API usage in Google AI Studio
3. Implement caching if needed for production

For more information, visit the [Google Gemini AI documentation](https://ai.google.dev/)