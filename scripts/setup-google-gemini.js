#!/usr/bin/env node

/**
 * Google Gemini AI Setup Script
 * Helps set up the correct AI package and configuration
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Google Gemini AI for Living Gold Store\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.local.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env.local created from example');
  } else {
    // Create a basic .env.local
    const basicEnv = `# Google AI (Gemini) API Key
GOOGLE_GENAI_API_KEY=your-google-ai-api-key-here

# Enable enhanced AI consultant
NEXT_PUBLIC_USE_ENHANCED_AI=true
`;
    fs.writeFileSync(envPath, basicEnv);
    console.log('✅ Basic .env.local created');
  }
  console.log('\n⚠️  IMPORTANT: Edit .env.local and add your Google AI API key');
  console.log('   Get your key at: https://makersuite.google.com/app/apikey\n');
}

// Check current package.json
console.log('📦 Checking current packages...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const hasOldPackage = packageJson.dependencies['@genkit-ai/googleai'];
const hasNewPackage = packageJson.dependencies['@genkit-ai/google-genai'];

if (hasOldPackage && !hasNewPackage) {
  console.log('🔄 Found old package @genkit-ai/googleai');
  console.log('📥 Installing correct package @genkit-ai/google-genai...\n');
  
  try {
    // Remove old package
    console.log('Removing @genkit-ai/googleai...');
    execSync('npm uninstall @genkit-ai/googleai', { stdio: 'inherit' });
    
    // Install new package
    console.log('\nInstalling @genkit-ai/google-genai...');
    execSync('npm install --save @genkit-ai/google-genai', { stdio: 'inherit' });
    
    console.log('\n✅ Package updated successfully!');
  } catch (error) {
    console.error('❌ Error updating packages:', error.message);
    console.log('\nPlease run manually:');
    console.log('  npm uninstall @genkit-ai/googleai');
    console.log('  npm install --save @genkit-ai/google-genai');
  }
} else if (!hasNewPackage) {
  console.log('📥 Installing @genkit-ai/google-genai...\n');
  
  try {
    execSync('npm install --save @genkit-ai/google-genai', { stdio: 'inherit' });
    console.log('\n✅ Package installed successfully!');
  } catch (error) {
    console.error('❌ Error installing package:', error.message);
    console.log('\nPlease run manually:');
    console.log('  npm install --save @genkit-ai/google-genai');
  }
} else {
  console.log('✅ Correct package already installed');
}

// Check if genkit.ts is properly configured
console.log('\n🔧 Checking AI configuration...');
const genkitPath = path.join(process.cwd(), 'src/ai/genkit.ts');

if (fs.existsSync(genkitPath)) {
  const genkitContent = fs.readFileSync(genkitPath, 'utf8');
  if (genkitContent.includes('@genkit-ai/google-genai')) {
    console.log('✅ genkit.ts is properly configured');
  } else {
    console.log('⚠️  genkit.ts might need updating');
    console.log('   It should import from @genkit-ai/google-genai');
  }
} else {
  console.log('❌ src/ai/genkit.ts not found');
}

// Final instructions
console.log('\n' + '='.repeat(50));
console.log('📋 Next Steps:');
console.log('\n1. Get your Google AI API key:');
console.log('   https://makersuite.google.com/app/apikey');
console.log('\n2. Add the API key to .env.local:');
console.log('   GOOGLE_GENAI_API_KEY=your-actual-key-here');
console.log('\n3. Start the development server:');
console.log('   npm run dev');
console.log('\n4. Test the AI consultant:');
console.log('   - Open http://localhost:9002');
console.log('   - Click the AI button (lightbulb) in bottom-right');
console.log('\n📖 For detailed instructions, see: docs/google-gemini-setup.md');

process.exit(0);