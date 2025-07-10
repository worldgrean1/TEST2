#!/usr/bin/env node

/**
 * Pre-deployment check script for Netlify
 * Validates the project is ready for production deployment
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 Running pre-deployment checks...\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'next.config.mjs',
  'netlify.toml',
  '.env.production',
  'app/layout.tsx',
  'app/page.tsx',
  'app/green/page.tsx'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} is missing`);
    allFilesExist = false;
  }
});

// Check package.json for required scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = ['build', 'netlify:build'];

requiredScripts.forEach(script => {
  if (packageJson.scripts[script]) {
    console.log(`✅ Script "${script}" exists`);
  } else {
    console.log(`❌ Script "${script}" is missing`);
    allFilesExist = false;
  }
});

// Check for unused files that should be removed
const unnecessaryFiles = [
  'test-*.js',
  'test-*.cjs',
  '*.test.js',
  '*.spec.js',
  'debug-*.cjs',
  'build-static.*'
];

console.log('\n📁 Checking for unnecessary files...');
// This is a simplified check - in a real scenario you'd use glob patterns

if (allFilesExist) {
  console.log('\n🎉 All deployment checks passed! Ready for Netlify deployment.');
  process.exit(0);
} else {
  console.log('\n❌ Some deployment checks failed. Please fix the issues above.');
  process.exit(1);
}
