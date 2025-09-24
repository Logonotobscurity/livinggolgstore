#!/usr/bin/env node

/**
 * AI Setup Verification Script
 * Checks if all AI components are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking AI Implementation Setup...\n');

const checks = {
  'AI Service Files': {
    'Unified AI Service': 'src/ai/unified-ai-service.ts',
    'Context Manager': 'src/ai/services/context-manager.ts',
    'Intent Classifier': 'src/ai/services/intent-classifier.ts',
    'AI Orchestrator': 'src/ai/services/ai-orchestrator.ts',
    'Nigerian Market Intelligence': 'src/ai/services/nigerian-market-intelligence.ts'
  },
  'Component Files': {
    'Enhanced AI Consultant': 'src/components/enhanced-ai-consultant.tsx',
    'AI Consultant Widget': 'src/components/ai-consultant-widget.tsx',
    'Original AI Consultant': 'src/components/ai-consultant.tsx'
  },
  'Hook Files': {
    'useUnifiedAI Hook': 'src/hooks/use-unified-ai.ts'
  },
  'Documentation': {
    'Implementation Strategy': 'docs/unified-ai-implementation-strategy.md',
    'Flagship Approach': 'docs/flagship-ai-approach.md',
    'Testing Guide': 'docs/ai-testing-guide.md'
  }
};

let allPassed = true;

// Check if files exist
for (const [category, files] of Object.entries(checks)) {
  console.log(`\n📁 ${category}:`);
  
  for (const [name, filepath] of Object.entries(files)) {
    const fullPath = path.join(process.cwd(), filepath);
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      const stats = fs.statSync(fullPath);
      console.log(`  ✅ ${name}: ${filepath} (${stats.size} bytes)`);
    } else {
      console.log(`  ❌ ${name}: ${filepath} NOT FOUND`);
      allPassed = false;
    }
  }
}

// Check for environment variables
console.log('\n🔐 Environment Variables:');
const requiredEnvVars = [
  'GOOGLE_GENAI_API_KEY',
  'NEXT_PUBLIC_USE_ENHANCED_AI'
];

for (const envVar of requiredEnvVars) {
  if (process.env[envVar]) {
    console.log(`  ✅ ${envVar}: Set`);
  } else {
    console.log(`  ⚠️  ${envVar}: Not set (may be in .env.local)`);
  }
}

// Check package.json for dependencies
console.log('\n📦 Dependencies:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['genkit', '@genkit-ai/googleai', 'firebase'];
  
  for (const dep of requiredDeps) {
    if (packageJson.dependencies[dep]) {
      console.log(`  ✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`  ❌ ${dep}: Not found in dependencies`);
      allPassed = false;
    }
  }
} catch (error) {
  console.log('  ❌ Could not read package.json');
  allPassed = false;
}

// Check for common issues
console.log('\n⚡ Common Issues Check:');

// Check if AI consultant widget imports enhanced version
try {
  const widgetContent = fs.readFileSync('src/components/ai-consultant-widget.tsx', 'utf8');
  if (widgetContent.includes('EnhancedAIConsultant')) {
    console.log('  ✅ AI Widget imports EnhancedAIConsultant');
  } else {
    console.log('  ❌ AI Widget does not import EnhancedAIConsultant');
    allPassed = false;
  }
  
  if (widgetContent.includes('USE_ENHANCED_AI')) {
    console.log('  ✅ Feature flag (USE_ENHANCED_AI) is configured');
  } else {
    console.log('  ⚠️  Feature flag not found in widget');
  }
} catch (error) {
  console.log('  ❌ Could not check widget configuration');
}

// Summary
console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ All core files are in place!');
  console.log('\nNext steps:');
  console.log('1. Ensure environment variables are set in .env.local');
  console.log('2. Run: npm install (if not done)');
  console.log('3. Run: npm run dev');
  console.log('4. Open http://localhost:9002');
  console.log('5. Click the AI button (lightbulb) in bottom-right');
} else {
  console.log('❌ Some files are missing. Please check the errors above.');
}

console.log('\n📖 For detailed testing instructions, see: docs/ai-testing-guide.md');

process.exit(allPassed ? 0 : 1);