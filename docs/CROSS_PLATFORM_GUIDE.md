# 🔄 Cross-Platform Development Guide for ANBU Landing Page

## Overview

This guide helps you work seamlessly across Windows, macOS (including M4 Pro), and Linux machines using Dropbox sync. I've set up scripts and configurations to handle platform-specific issues automatically.

## ⚠️ Critical Setup: Exclude node_modules from Dropbox

**This is the most important step to avoid conflicts!**

### How to Exclude Folders from Dropbox Sync:

1. **Open Dropbox Preferences**
   - Windows: Right-click Dropbox icon → Preferences
   - Mac: Click Dropbox icon → Preferences
   - Linux: Click Dropbox icon → Preferences

2. **Navigate to Sync Settings**
   - Click on "Sync" tab
   - Click "Selective Sync" or "Choose folders to sync"

3. **Uncheck These Folders** within `ANBU_Landing_Page`:
   - `node_modules` (CRITICAL)
   - `.next` 
   - `.turbo`
   - `dist`
   - `build`

4. **Click "Update" to save changes**

## 🚀 Quick Start for Each Platform

### When Switching to Your MacBook M4 Pro

```bash
# 1. Wait for Dropbox to finish syncing (check icon shows ✓)

# 2. Option A: Use Docker (Recommended - No conflicts!)
pnpm docker:setup
pnpm docker:landing

# 2. Option B: Local Development
pnpm platform:setup  # Automatically detects macOS and configures
# OR manually:
rm -rf node_modules .next .turbo
cp .env.macos .env
pnpm install
pnpm dev
```

### When Switching to Windows

```bash
# 1. Wait for Dropbox sync to complete

# 2. Option A: Use Docker (Recommended)
pnpm docker:setup
pnpm docker:landing

# 2. Option B: Local Development  
pnpm platform:setup  # Automatically detects Windows
# OR manually:
rmdir /s /q node_modules .next .turbo
copy .env.windows .env
pnpm install
pnpm dev
```

### When Switching to Linux (Arch)

```bash
# 1. Wait for Dropbox sync

# 2. Option A: Use Docker (Best performance on Linux!)
pnpm docker:setup
pnpm docker:landing

# 2. Option B: Local Development
pnpm platform:setup  # Automatically detects Linux
# OR manually:
rm -rf node_modules .next .turbo
cp .env.linux .env
pnpm install
pnpm dev
```

## 🛠️ Available Platform Commands

| Command | Description | When to Use |
|---------|-------------|-------------|
| `pnpm platform:switch` | Interactive platform switcher | First time on a new machine |
| `pnpm platform:setup` | Auto-setup for current platform | Switching machines |
| `pnpm platform:clean` | Remove all platform-specific files | Before switching platforms |
| `pnpm platform:check` | Check for platform issues | Debugging sync problems |
| `pnpm platform:recover` | Recover from lockfile conflicts | When you get lockfile errors |
| `pnpm safe:install` | Clean install for current platform | When dependencies are corrupted |

## 🐳 Docker: The Ultimate Solution

Docker eliminates ALL platform-specific issues. I strongly recommend using it:

```bash
# One command works on ALL platforms:
pnpm docker:landing

# Your app runs in an identical Linux container regardless of host OS
```

### Docker Benefits:
- ✅ No node_modules conflicts
- ✅ No lockfile issues  
- ✅ Identical environment on all machines
- ✅ Hot reload works everywhere
- ✅ No platform-specific dependency problems

## 🔧 Handling Common Issues

### Issue 1: "Cannot install with frozen-lockfile because pnpm-lock.yaml is not up to date"

**Cause**: Lockfile was created on a different platform

**Solution**:
```bash
# Quick fix:
pnpm platform:recover

# OR Manual fix:
rm -rf node_modules pnpm-lock.yaml
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: Updated lockfile for [platform]"
```

### Issue 2: "ELIFECYCLE Command failed" on Mac after using Windows

**Cause**: Windows-specific binaries in node_modules

**Solution**:
```bash
pnpm platform:clean
pnpm install
```

### Issue 3: Dropbox Sync Conflicts

**Symptoms**: 
- Files like `package (Rosa's conflicted copy).json`
- Duplicate node_modules folders
- Sync never completes

**Solution**:
1. Ensure node_modules is excluded from Dropbox (see setup above)
2. Delete all conflicted copies
3. Run `pnpm platform:setup`

### Issue 4: Hot Reload Not Working

**Platform-Specific Solutions**:

Windows:
```bash
# Ensure polling is enabled
echo "WATCHPACK_POLLING=true" >> .env
pnpm dev
```

macOS/Linux:
```bash
# Ensure polling is disabled
echo "WATCHPACK_POLLING=false" >> .env
pnpm dev
```

## 📋 Platform Switching Checklist

Before leaving a machine:
- [ ] Commit any code changes
- [ ] Push to git if needed
- [ ] Wait for Dropbox sync to complete
- [ ] Note: node_modules should NOT sync

When arriving at a new machine:
- [ ] Pull latest git changes (if using git)
- [ ] Wait for Dropbox sync to complete
- [ ] Run `pnpm platform:setup` or use Docker
- [ ] Verify with `pnpm platform:check`

## 🎯 Best Practices

### 1. **Always Use Docker When Possible**
```bash
pnpm docker:landing  # Works identically everywhere
```

### 2. **Exclude node_modules from Dropbox**
This prevents 90% of cross-platform issues

### 3. **Commit Lockfiles Carefully**
- Only commit pnpm-lock.yaml after testing
- Use `pnpm platform:recover` if conflicts occur

### 4. **Use Platform Scripts**
```bash
# Instead of: pnpm install
# Use: pnpm platform:setup

# Instead of: rm -rf node_modules
# Use: pnpm platform:clean
```

### 5. **Keep .env Files Platform-Specific**
- Don't sync .env through Dropbox
- Use .env.windows, .env.macos, .env.linux templates

## 🚨 Emergency Recovery

If everything is broken:

```bash
# 1. Nuclear option - clean everything
git clean -fdx  # WARNING: Removes ALL untracked files
git reset --hard

# 2. Setup from scratch
pnpm platform:setup

# 3. Use Docker to avoid future issues
pnpm docker:setup
pnpm docker:landing
```

## 📱 Platform Detection

The setup scripts automatically detect:
- Windows (x64, ARM)
- macOS Intel (x64)
- macOS Apple Silicon (M1/M2/M3/M4)
- Linux (x64, ARM)

You can check your platform:
```bash
node -e "console.log(process.platform, process.arch)"
```

## 💡 Pro Tips

1. **For Quick Development**: Use Docker everywhere
2. **For Native Performance**: Use platform:setup scripts
3. **For CI/CD**: Always use --frozen-lockfile
4. **For Teams**: Standardize on Docker to avoid "works on my machine"

## 🆘 Need Help?

1. Run diagnostics: `pnpm platform:check`
2. Check Docker guide: [DOCKER_GUIDE.md](./DOCKER_GUIDE.md)
3. Interactive help: `pnpm platform:switch`

Remember: **Docker solves 99% of cross-platform issues!** When in doubt, use:
```bash
pnpm docker:landing
```

---

Happy coding across all your devices! 🚀