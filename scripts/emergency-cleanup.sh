#!/bin/bash

# Emergency Cleanup Script for Dropbox Sync Issues
# Run this to quickly remove large folders that shouldn't sync

echo -e "\033[31m🚨 Emergency Cleanup for Dropbox Sync\033[0m"
echo "======================================"
echo ""
echo -e "\033[33mThis will remove node_modules and build folders to fix sync issues\033[0m"
echo ""

# Folders to remove
FOLDERS_TO_REMOVE=(
    "node_modules"
    "apps/landing/node_modules"
    "apps/docs-hub/node_modules"
    "apps/solutions-portal/node_modules"
    ".next"
    "apps/landing/.next"
    ".turbo"
    "dist"
    "build"
)

TOTAL_SAVED=0

echo -e "\033[33m🗑️  Removing problematic folders...\033[0m"
echo ""

for folder in "${FOLDERS_TO_REMOVE[@]}"; do
    if [ -d "$folder" ]; then
        # Get size before deletion
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            SIZE=$(du -sh "$folder" 2>/dev/null | cut -f1)
        else
            # Linux
            SIZE=$(du -sh "$folder" 2>/dev/null | cut -f1)
        fi
        
        echo -n "  Removing: $folder ($SIZE)..."
        
        if rm -rf "$folder" 2>/dev/null; then
            echo -e " \033[32m✅\033[0m"
        else
            echo -e " \033[31m❌ Failed\033[0m"
        fi
    else
        echo -e "  \033[90mSkipped: $folder (doesn't exist)\033[0m"
    fi
done

echo ""
echo -e "\033[32m✨ Cleanup Complete!\033[0m"
echo ""
echo -e "\033[33m📋 Next Steps:\033[0m"
echo "1. Go to Dropbox Selective Sync settings"
echo "2. Uncheck any remaining node_modules folders"
echo "3. Click Confirm and Save"
echo "4. Resume Dropbox syncing"
echo ""
echo -e "\033[36m🐳 Then use Docker (no node_modules needed!):\033[0m"
echo -e "\033[32m   pnpm docker:landing\033[0m"
echo ""
echo -e "\033[33m📱 Or if you need local development:\033[0m"
echo -e "\033[32m   pnpm install\033[0m"