#!/bin/bash

# ANBU Docker Start Script for Unix Systems (macOS/Linux)
# This script automatically detects the platform and starts Docker with optimal settings

set -e  # Exit on error

echo "🐳 ANBU Docker Launcher"
echo "======================="

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     PLATFORM=linux;;
    Darwin*)    PLATFORM=macos;;
    *)          PLATFORM="unknown";;
esac

echo "Platform detected: $PLATFORM"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# Use platform-specific compose file
if [ "$PLATFORM" = "linux" ] || [ "$PLATFORM" = "macos" ]; then
    echo "🚀 Starting with Unix-optimized settings..."
    docker-compose -f docker-compose.yml -f docker-compose.unix.yml up landing
else
    echo "🚀 Starting with default settings..."
    docker-compose up landing
fi