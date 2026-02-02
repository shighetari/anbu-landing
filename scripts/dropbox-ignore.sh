#!/bin/bash

# Bash Script to Configure Dropbox Ignore for ANBU Landing Page (macOS/Linux)
# This uses Dropbox's native ignore feature which is better than Selective Sync
# Run this script in Terminal

echo -e "\033[36m🔧 Configuring Dropbox Ignore for ANBU Landing Page\033[0m"
echo "====================================================="
echo ""

# Get the project path (adjust if your Dropbox is in a different location)
PROJECT_PATH="$HOME/Dropbox/Projects/ANBU_Landing_Page"

# Folders to ignore (they stay local but don't sync)
FOLDERS_TO_IGNORE=(
    "node_modules"
    ".next"
    ".turbo"
    ".cache"
    ".pnpm"
    "dist"
    "build"
    "out"
    "apps/landing/node_modules"
    "apps/landing/.next"
    "apps/docs-hub/node_modules"
    "apps/solutions-portal/node_modules"
)

echo -e "\033[33m📁 Setting Dropbox ignore for development folders...\033[0m"
echo ""

for folder in "${FOLDERS_TO_IGNORE[@]}"; do
    FULL_PATH="$PROJECT_PATH/$folder"
    
    if [ -d "$FULL_PATH" ]; then
        # Set the Dropbox ignored attribute (macOS/Linux)
        xattr -w com.dropbox.ignored 1 "$FULL_PATH" 2>/dev/null || \
        attr -s com.dropbox.ignored -V 1 "$FULL_PATH" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo -e "\033[32m✅ Ignored: $folder\033[0m"
        else
            echo -e "\033[31m❌ Failed to ignore: $folder\033[0m"
            echo "   Try: xattr -w com.dropbox.ignored 1 \"$FULL_PATH\""
        fi
    else
        echo -e "\033[90m⏭️  Skipped (doesn't exist): $folder\033[0m"
    fi
done

echo ""
echo -e "\033[32m✨ Configuration complete!\033[0m"
echo ""
echo -e "\033[36m📝 Important Notes:\033[0m"
echo "- Ignored folders stay on your Mac but don't sync to Dropbox"
echo "- Each machine maintains its own node_modules (platform-specific)"
echo "- Run 'pnpm install' after setting up"
echo "- Use 'pnpm platform:setup' for automatic configuration"
echo ""

# Check current status
echo -e "\033[33m📊 Current folder sizes:\033[0m"
if [ -d "$PROJECT_PATH/node_modules" ]; then
    SIZE=$(du -sh "$PROJECT_PATH/node_modules" 2>/dev/null | cut -f1)
    echo "   node_modules: $SIZE"
fi

echo ""
echo -e "\033[32m🚀 Ready for development on macOS!\033[0m"
echo -e "\033[36m   Run: pnpm platform:setup\033[0m"