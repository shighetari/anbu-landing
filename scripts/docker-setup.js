#!/usr/bin/env node

/**
 * Cross-platform Docker setup script
 * Detects the operating system and provides appropriate Docker commands
 */

const os = require('os');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Detect platform
const platform = os.platform();
const isWindows = platform === 'win32';
const isMac = platform === 'darwin';
const isLinux = platform === 'linux';

console.log('🐳 ANBU Docker Setup');
console.log('====================');
console.log(`Platform detected: ${platform}`);
console.log('');

// Check if Docker is installed
try {
  execSync('docker --version', { stdio: 'ignore' });
  console.log('✅ Docker is installed');
} catch (error) {
  console.error('❌ Docker is not installed or not in PATH');
  console.log('Please install Docker Desktop from: https://www.docker.com/products/docker-desktop');
  process.exit(1);
}

// Check if Docker is running
try {
  execSync('docker info', { stdio: 'ignore' });
  console.log('✅ Docker is running');
} catch (error) {
  console.error('❌ Docker is not running');
  console.log('Please start Docker Desktop');
  process.exit(1);
}

// Platform-specific setup
console.log('\n📋 Platform-specific recommendations:');
console.log('=====================================');

if (isWindows) {
  console.log('Windows detected - Setting up for optimal performance:');
  console.log('');
  console.log('1. Ensure Docker Desktop is using WSL 2:');
  console.log('   - Open Docker Desktop Settings');
  console.log('   - Go to General → Use WSL 2 based engine');
  console.log('');
  console.log('2. For best performance, clone this repo inside WSL 2:');
  console.log('   - Open WSL terminal: wsl');
  console.log('   - Clone repo: git clone <repo-url>');
  console.log('');
  console.log('3. Recommended Docker command:');
  console.log('   pnpm docker:landing');
  console.log('   OR for Windows-optimized settings:');
  console.log('   docker-compose -f docker-compose.yml -f docker-compose.windows.yml up landing');
} else if (isMac) {
  console.log('macOS detected - Setting up for optimal performance:');
  console.log('');
  console.log('1. Ensure Docker Desktop has sufficient resources:');
  console.log('   - Open Docker Desktop Settings');
  console.log('   - Go to Resources → Advanced');
  console.log('   - Recommended: 4GB RAM, 2 CPUs minimum');
  console.log('');
  console.log('2. Enable VirtioFS for better performance:');
  console.log('   - Settings → General → Choose file sharing implementation');
  console.log('   - Select VirtioFS');
  console.log('');
  console.log('3. Recommended Docker command:');
  console.log('   pnpm docker:landing');
  console.log('   OR for macOS-optimized settings:');
  console.log('   docker-compose -f docker-compose.yml -f docker-compose.unix.yml up landing');
} else if (isLinux) {
  console.log('Linux detected - Native Docker performance!');
  console.log('');
  console.log('1. Ensure your user is in the docker group:');
  console.log('   sudo usermod -aG docker $USER');
  console.log('   (logout and login again for changes to take effect)');
  console.log('');
  console.log('2. For Arch Linux specifically:');
  console.log('   - Install Docker: sudo pacman -S docker docker-compose');
  console.log('   - Enable service: sudo systemctl enable --now docker');
  console.log('');
  console.log('3. Recommended Docker command:');
  console.log('   pnpm docker:landing');
  console.log('   OR for Linux-optimized settings:');
  console.log('   docker-compose -f docker-compose.yml -f docker-compose.unix.yml up landing');
}

// Create .env file if it doesn't exist
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating .env file...');
  const envContent = `# Environment variables for Docker
NODE_ENV=development
${isWindows ? 'WATCHPACK_POLLING=true' : 'WATCHPACK_POLLING=false'}
${isWindows ? 'CHOKIDAR_USEPOLLING=true' : 'CHOKIDAR_USEPOLLING=false'}
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created with platform-specific settings');
} else {
  console.log('\n✅ .env file already exists');
}

console.log('\n🚀 Quick Start Commands:');
console.log('=======================');
console.log('Start landing app:     pnpm docker:landing');
console.log('View logs:            pnpm docker:landing:logs');
console.log('Access container:     pnpm docker:landing:shell');
console.log('Stop containers:      pnpm docker:stop');
console.log('Clean everything:     pnpm docker:clean');

console.log('\n✨ Setup complete! You can now run: pnpm docker:landing');
