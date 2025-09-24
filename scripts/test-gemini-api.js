#!/usr/bin/env node

/**
 * Test Google Gemini API Connection
 * This script verifies that your API key is working correctly
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGeminiAPI() {
  console.log('🧪 Testing Google Gemini API Connection...\n');

  // Check if API key is set
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GOOGLE_GENAI_API_KEY environment variable is not set');
    console.log('\nPlease set it using:');
    console.log('  $env:GOOGLE_GENAI_API_KEY = "your-api-key-here"');
    process.exit(1);
  }

  console.log('✅ API Key found:', apiKey.substring(0, 10) + '...');

  try {
    // Initialize the Gemini API
    console.log('\n📡 Connecting to Google Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Get the gemini-1.5-flash model (updated model name)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Test with a simple prompt
    console.log('\n💬 Sending test prompt...');
    const prompt = "Hello! Please respond with a simple greeting to confirm the API is working.";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n🤖 Gemini Response:');
    console.log('   ', text);
    
    console.log('\n✅ SUCCESS! Google Gemini API is working correctly!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Your API key is valid and working');
    console.log('   2. You can now use the AI consultant in your app');
    console.log('   3. Run "npm run dev" and test the AI button');
    
  } catch (error) {
    console.error('\n❌ ERROR testing Gemini API:');
    console.error('   ', error.message);
    
    if (error.message.includes('API key not valid')) {
      console.log('\n🔑 API Key Issue:');
      console.log('   - Your API key might be invalid or expired');
      console.log('   - Get a new key at: https://makersuite.google.com/app/apikey');
    } else if (error.message.includes('Cannot find module')) {
      console.log('\n📦 Missing Package:');
      console.log('   Please install the Google AI SDK:');
      console.log('   npm install @google/generative-ai');
    } else {
      console.log('\n🔍 Troubleshooting:');
      console.log('   - Check your internet connection');
      console.log('   - Verify the API key is correct');
      console.log('   - Ensure the API is enabled in your Google Cloud project');
    }
    
    process.exit(1);
  }
}

// Run the test
testGeminiAPI().catch(console.error);