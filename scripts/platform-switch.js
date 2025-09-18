#!/usr/bin/env node

/**
 * Platform Switch Helper for ANBU Landing Page
 * Safely handles transitions between Windows, macOS, and Linux development environments
 */

import os from 'os';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Detect current platform
const platform = os.platform();
const arch = os.arch();
const isWindows = platform === 'win32';
const isMac = platform === 'darwin';
const isLinux = platform === 'linux';
const isM1Mac = isMac && (arch === 'arm64');

console.log(`${colors.cyan}${colors.bright}🔄 ANBU Platform Switch Helper${colors.reset}`);
console.log('=' .repeat(50));
console.log(`${colors.blue}Platform:${colors.reset} ${platform}`);
console.log(`${colors.blue}Architecture:${colors.reset} ${arch}`);
if (isM1Mac) {
  console.log(`${colors.green}✅ Apple Silicon (M1/M2/M3/M4) detected${colors.reset}`);
}
console.log('');

// Check for Dropbox sync status
function checkDropboxStatus() {
  console.log(`${colors.yellow}📂 Checking Dropbox sync status...${colors.reset}`);
  
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    const stats = fs.statSync(nodeModulesPath);
    const files = fs.readdirSync(nodeModulesPath);
    console.log(`  ⚠️  node_modules exists with ${files.length} packages`);
    console.log(`  📅 Last modified: ${stats.mtime}`);
    console.log(`${colors.red}  ⚠️  WARNING: node_modules should be excluded from Dropbox sync!${colors.reset}`);
    console.log(`${colors.yellow}  💡 See .dropboxignore for instructions on excluding folders${colors.reset}`);
  } else {
    console.log(`${colors.green}  ✅ node_modules not found (good - it shouldn't sync)${colors.reset}`);
  }
  console.log('');
}

// Check for platform-specific issues
function checkPlatformIssues() {
  console.log(`${colors.yellow}🔍 Checking for platform-specific issues...${colors.reset}`);
  
  // Check if lockfile exists
  const lockfilePath = path.join(process.cwd(), 'pnpm-lock.yaml');
  if (!fs.existsSync(lockfilePath)) {
    console.log(`${colors.red}  ❌ pnpm-lock.yaml not found!${colors.reset}`);
    console.log(`  Run: pnpm install`);
    return false;
  } else {
    console.log(`${colors.green}  ✅ pnpm-lock.yaml found${colors.reset}`);
  }
  
  // Check for platform-specific packages in lockfile
  try {
    const lockfileContent = fs.readFileSync(lockfilePath, 'utf8');
    const hasSharp = lockfileContent.includes('sharp');
    const hasFsevents = lockfileContent.includes('fsevents');
    
    if (hasSharp) {
      console.log(`  ⚠️  Found 'sharp' - platform-specific image processing library`);
    }
    if (hasFsevents && !isMac) {
      console.log(`  ⚠️  Found 'fsevents' (macOS only) but you're on ${platform}`);
    }
  } catch (error) {
    console.log(`${colors.red}  ❌ Error reading lockfile: ${error.message}${colors.reset}`);
  }
  
  console.log('');
  return true;
}

// Clean platform-specific files
function cleanPlatformFiles() {
  console.log(`${colors.yellow}🧹 Cleaning platform-specific files...${colors.reset}`);
  
  const dirsToClean = [
    'node_modules',
    '.next',
    '.turbo',
    'apps/landing/node_modules',
    'apps/landing/.next',
    'apps/docs-hub/node_modules',
    'apps/solutions-portal/node_modules'
  ];
  
  dirsToClean.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      console.log(`  🗑️  Removing ${dir}...`);
      try {
        if (isWindows) {
          execSync(`rmdir /s /q "${fullPath.replace(/\//g, '\\')}"`, { stdio: 'ignore' });
        } else {
          execSync(`rm -rf "${fullPath}"`, { stdio: 'ignore' });
        }
        console.log(`${colors.green}  ✅ Removed ${dir}${colors.reset}`);
      } catch (error) {
        console.log(`${colors.red}  ❌ Failed to remove ${dir}${colors.reset}`);
      }
    }
  });
  
  console.log('');
}

// Setup for current platform
function setupPlatform() {
  console.log(`${colors.yellow}🚀 Setting up for ${platform}...${colors.reset}`);
  
  // Create platform-specific .env if it doesn't exist
  const envFile = '.env';
  const envTemplateName = isWindows ? '.env.windows' : isMac ? '.env.macos' : '.env.linux';
  const envTemplate = path.join(process.cwd(), envTemplateName);
  
  if (fs.existsSync(envTemplate) && !fs.existsSync(envFile)) {
    console.log(`  📝 Creating .env from ${envTemplateName}...`);
    fs.copyFileSync(envTemplate, envFile);
    console.log(`${colors.green}  ✅ Created .env file${colors.reset}`);
  }
  
  // Install dependencies
  console.log(`  📦 Installing dependencies with pnpm...`);
  try {
    execSync('pnpm install', { stdio: 'inherit' });
    console.log(`${colors.green}  ✅ Dependencies installed${colors.reset}`);
  } catch (error) {
    console.log(`${colors.red}  ❌ Failed to install dependencies${colors.reset}`);
    return false;
  }
  
  console.log('');
  return true;
}

// Recovery procedure for lockfile conflicts
function recoverFromLockfileConflict() {
  console.log(`${colors.yellow}🔧 Recovering from lockfile conflict...${colors.reset}`);
  console.log(`  1. Backing up current lockfile...`);
  
  const lockfilePath = path.join(process.cwd(), 'pnpm-lock.yaml');
  const backupPath = path.join(process.cwd(), `pnpm-lock.yaml.backup.${Date.now()}`);
  
  if (fs.existsSync(lockfilePath)) {
    fs.copyFileSync(lockfilePath, backupPath);
    console.log(`${colors.green}  ✅ Backup created: ${backupPath}${colors.reset}`);
  }
  
  console.log(`  2. Removing lockfile and node_modules...`);
  cleanPlatformFiles();
  
  if (fs.existsSync(lockfilePath)) {
    fs.unlinkSync(lockfilePath);
  }
  
  console.log(`  3. Regenerating lockfile...`);
  try {
    execSync('pnpm install', { stdio: 'inherit' });
    console.log(`${colors.green}  ✅ Lockfile regenerated${colors.reset}`);
    console.log(`${colors.yellow}  ⚠️  Remember to commit the new lockfile!${colors.reset}`);
    return true;
  } catch (error) {
    console.log(`${colors.red}  ❌ Failed to regenerate lockfile${colors.reset}`);
    return false;
  }
}

// Main menu
function showMenu() {
  console.log(`${colors.cyan}${colors.bright}Choose an action:${colors.reset}`);
  console.log('  1. Quick setup for current platform (Recommended)');
  console.log('  2. Clean all platform-specific files');
  console.log('  3. Recover from lockfile conflict');
  console.log('  4. Check Dropbox sync status');
  console.log('  5. Use Docker instead (Best for cross-platform)');
  console.log('  6. Exit');
  console.log('');
}

// Process user choice
function processChoice(choice) {
  switch(choice.trim()) {
    case '1':
      checkDropboxStatus();
      checkPlatformIssues();
      cleanPlatformFiles();
      setupPlatform();
      console.log(`${colors.green}${colors.bright}✅ Platform setup complete!${colors.reset}`);
      console.log(`Run: ${colors.cyan}pnpm dev${colors.reset} or ${colors.cyan}pnpm docker:landing${colors.reset}`);
      break;
      
    case '2':
      cleanPlatformFiles();
      console.log(`${colors.green}✅ Cleanup complete!${colors.reset}`);
      break;
      
    case '3':
      recoverFromLockfileConflict();
      break;
      
    case '4':
      checkDropboxStatus();
      checkPlatformIssues();
      break;
      
    case '5':
      console.log(`${colors.cyan}${colors.bright}🐳 Docker Setup${colors.reset}`);
      console.log('Run these commands:');
      console.log(`  ${colors.green}pnpm docker:setup${colors.reset} - Initial Docker setup`);
      console.log(`  ${colors.green}pnpm docker:landing${colors.reset} - Start the app in Docker`);
      console.log('');
      console.log('Docker handles all platform differences automatically!');
      break;
      
    case '6':
      console.log(`${colors.cyan}Goodbye! 👋${colors.reset}`);
      process.exit(0);
      break;
      
    default:
      console.log(`${colors.red}Invalid choice. Please try again.${colors.reset}`);
  }
}

// Interactive mode
if (process.argv.length === 2) {
  showMenu();
  
  import readline from 'readline';
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Enter your choice (1-6): ', (answer) => {
    processChoice(answer);
    rl.close();
  });
} else {
  // Command line arguments
  const command = process.argv[2];
  switch(command) {
    case 'clean':
      cleanPlatformFiles();
      break;
    case 'setup':
      checkDropboxStatus();
      checkPlatformIssues();
      cleanPlatformFiles();
      setupPlatform();
      break;
    case 'recover':
      recoverFromLockfileConflict();
      break;
    case 'check':
      checkDropboxStatus();
      checkPlatformIssues();
      break;
    default:
      console.log(`Unknown command: ${command}`);
      console.log('Usage: node platform-switch.js [clean|setup|recover|check]');
  }
}