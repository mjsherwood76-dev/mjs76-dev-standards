#!/usr/bin/env node

/**
 * Initialization Script for Next.js + Cloudflare Template
 * 
 * Usage: node scripts/init.js <project-name>
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function init() {
  console.log('🚀 Initializing Next.js + Cloudflare Project\n');

  // Get project name
  const projectName = process.argv[2] || (await prompt('Project name: '));

  if (!projectName) {
    console.error('❌ Project name is required');
    process.exit(1);
  }

  const projectPath = path.resolve(process.cwd(), '..', projectName);

  // Check if directory already exists
  if (fs.existsSync(projectPath)) {
    console.error(`❌ Directory "${projectName}" already exists`);
    process.exit(1);
  }

  // Create project directory
  console.log(`\n📁 Creating project directory: ${projectName}`);
  fs.mkdirSync(projectPath, { recursive: true });

  // Copy template files
  console.log('📄 Copying template files...');
  copyRecursive(process.cwd(), projectPath, [
    'node_modules',
    '.next',
    'out',
    'dist',
    '.wrangler',
    'scripts',
  ]);

  // Rename example files
  const wranglerExample = path.join(projectPath, 'wrangler.toml.example');
  const wranglerConfig = path.join(projectPath, 'wrangler.toml');
  if (fs.existsSync(wranglerExample)) {
    fs.copyFileSync(wranglerExample, wranglerConfig);
  }

  const envExample = path.join(projectPath, '.env.example');
  const envLocal = path.join(projectPath, '.env.local');
  if (fs.existsSync(envExample)) {
    fs.copyFileSync(envExample, envLocal);
  }

  // Update package.json name
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  console.log('\n✅ Project created successfully!\n');
  console.log('Next steps:\n');
  console.log(`  1. cd ../${projectName}`);
  console.log('  2. npm install');
  console.log('  3. Edit wrangler.toml with your Cloudflare account ID');
  console.log('  4. npm run dev\n');

  rl.close();
}

function copyRecursive(src, dest, exclude = []) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (exclude.includes(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath, exclude);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

init().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
