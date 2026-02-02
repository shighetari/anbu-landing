# Docker Development Guide

Hey team, I'm Francisco, and I've put together this Docker setup for our ANBU landing page. After wrestling with "works on my machine" issues between my Windows desktop and MacBook M4 Pro, I decided to containerize everything. This guide will walk you through the setup I'm using - it's been battle-tested across Windows, Mac, and Linux.

## Why I Chose Docker

Look, I get it - Docker might seem like overkill for a landing page. But after losing hours to platform-specific dependency issues (looking at you, `sharp` and `fsevents`), I realized we needed a better solution. Now, whether you're on Windows, Mac, or Linux, you'll get the exact same development environment. No more lockfile conflicts, no more "but it works on my machine" - just consistent, reproducible builds.

## Quick Start

First things first - here's how to get running in under a minute:

```bash
# The command you'll use 90% of the time
pnpm docker:landing

# Watch out for this typo - I make it constantly
pnpm docker:landing  # Correct (with an 'n')
pnmp docker:landing  # Wrong (I keep typing this by accident)
```

That's it. Seriously. Everything else in this guide is for when you want to understand what's happening under the hood or when something goes wrong.

## Setting Up on Different Platforms

I work across three different machines, so I've tested this setup extensively on each platform. Here's what you need to know for each one.

### Windows Setup

I primarily develop on Windows 11, and getting Docker to play nice with Windows took some figuring out. Here's what works:

**What You Need:**

1. Docker Desktop with WSL 2 enabled - this is crucial for performance
2. Windows Terminal (the default terminal is painful for development)

**Getting Started:**

```bash
# I created a setup script that detects your platform
pnpm docker:setup

# Then just run the landing page
pnpm docker:landing
```

**Windows Quirks I've Found:**

- File watching requires polling because of how Windows handles file systems. I've already configured this in the Docker setup, so hot reload will work, but it's slightly slower (1-2 seconds) than on Mac/Linux.
- If you're getting permission errors, make sure Docker Desktop is running as administrator.
- For best performance, clone the repo inside WSL 2 rather than on your Windows filesystem. Trust me on this one - the speed difference is night and day.

### macOS Setup (Including M4 Pro)

My MacBook M4 Pro is where I do most of my creative work, and Docker runs beautifully on Apple Silicon once you know the tricks.

**Initial Setup:**

```bash
# Install Docker Desktop for Mac first
# Then run our setup
pnpm docker:setup
pnpm docker:landing
```

**Mac-Specific Tips:**

- I've configured the volumes to use cached mounts, which significantly improves performance on macOS
- File watching works natively without polling - you'll see changes instantly
- If you're on an M-series chip like me, Docker Desktop handles the architecture translation automatically
- Give Docker at least 4GB of RAM in Docker Desktop settings. I use 8GB because I can, but 4GB is plenty for our landing page

### Linux Setup

I also test on Arch Linux (because I like to live dangerously). Linux gives you the best Docker performance since there's no VM layer.

**Installation on Arch:**

```bash
# Install Docker
sudo pacman -S docker docker-compose

# Start the service
sudo systemctl enable --now docker

# Add yourself to the docker group
sudo usermod -aG docker $USER
# Log out and back in after this

# Then run our app
pnpm docker:landing
```

The beautiful thing about Linux is that Docker runs natively - no virtualization layer means everything is lightning fast.

## Understanding the Docker Setup

Let me explain what I've built here and why I made certain choices.

### The Architecture

I've set up a multi-stage Dockerfile that:

1. Caches dependencies separately from code (rebuilds are faster)
2. Uses Alpine Linux for smaller images
3. Includes health checks so we know when the container is ready
4. Configures hot reload based on your platform automatically

### Key Commands I Use Daily

```bash
# Start development
pnpm docker:landing          # This is my most-used command

# Check what's happening
pnpm docker:landing:logs     # Watch logs in real-time

# Debug issues
pnpm docker:landing:shell    # Get inside the container

# Clean up when things get messy
pnpm docker:clean            # Nuclear option - removes everything
```

### The Scripts I Created

I've added several convenience scripts to `package.json`:

- `docker:landing` - Starts just the landing page (what you'll use most)
- `docker:landing:build` - Rebuilds from scratch when dependencies change
- `docker:landing:logs` - Tails the container logs
- `docker:landing:shell` - SSH into the container for debugging
- `docker:setup` - Auto-detects your platform and configures everything

## Troubleshooting Common Issues

Here are the problems I've run into and how I fixed them:

### "Port 3000 is already in use"

This happens to me constantly. Something else is running on port 3000.

```bash
# Find what's using the port (Windows)
netstat -ano | findstr :3000
taskkill /PID [THE_PID] /F

# Find what's using the port (Mac/Linux)
lsof -i :3000
kill -9 [THE_PID]

# Or just use a different port
# Edit docker-compose.override.yml and change the port mapping
```

### Hot Reload Not Working

This drove me crazy until I figured out the platform differences.

**On Windows:** Make sure these environment variables are set (I've added them to .env.windows):

```
WATCHPACK_POLLING=true
CHOKIDAR_USEPOLLING=true
```

**On Mac/Linux:** Polling should be OFF:

```
WATCHPACK_POLLING=false
CHOKIDAR_USEPOLLING=false
```

### "Cannot find module" Errors

This usually means node_modules got corrupted or mixed between platforms.

```bash
# My fix-everything command
pnpm docker:clean && pnpm docker:landing:build
```

### Slow Performance on Windows

If Docker is crawling on Windows, you're probably running it on the Windows filesystem instead of WSL 2. Move your project inside WSL:

```bash
# Inside WSL
cd ~
git clone [your-repo]
# Now Docker will be much faster
```

## Tips from My Experience

After months of using this setup, here's what I've learned:

**Always Use Docker for Consistency**
I can't stress this enough. Even if you can run the app locally, use Docker. It eliminates "works on my machine" issues completely.

**Keep Your Images Small**
I use Alpine Linux as the base image because it's tiny (5MB). Our full container is under 200MB, which means faster pulls and deploys.

**Layer Caching is Your Friend**
I've ordered the Dockerfile to copy files that change least often first. This means when you change code, Docker only rebuilds the last layer, not everything.

**Volume Mounts for Development**
The source code is mounted as a volume, not copied into the container. This means your changes appear instantly without rebuilding.

**Platform Detection Scripts**
I spent way too much time manually configuring for different platforms. The `docker:setup` script now detects your OS and configures everything automatically.

## For New Team Members

If you're new to Docker, don't worry. Here's all you really need to know:

**What is Docker?**
Think of it as a lightweight virtual machine that packages our app and all its dependencies. Everyone gets the exact same environment, regardless of their operating system.

**Why use it?**

- No more "install Node version X, then install package Y"
- No more "it works on my machine" debugging sessions
- Onboarding takes minutes, not hours
- Switch between projects without dependency conflicts

**Daily Workflow:**

1. Pull the latest code: `git pull`
2. Start Docker: `pnpm docker:landing`
3. Code as normal - changes auto-reload
4. Stop when done: `pnpm docker:stop`

**When to Rebuild:**

- After pulling changes that modify package.json
- When switching branches with different dependencies
- If something seems broken: `pnpm docker:landing:rebuild`

## Environment Configuration

I've set up environment templates for each platform. The setup script copies the right one automatically, but here's what's different:

**Windows (.env.windows):**

- Polling enabled for file watching
- Longer intervals to reduce CPU usage

**macOS (.env.macos):**

- Native file watching (no polling)
- Optimizations for Darwin kernel

**Linux (.env.linux):**

- Native file watching
- Minimal overhead configuration

## Performance Expectations

Here's what I'm seeing on my machines:

| What I'm Measuring | Windows 11 | MacBook M4 | Arch Linux |
| ------------------ | ---------- | ---------- | ---------- |
| Initial build      | 2-3 min    | 1-2 min    | 1 min      |
| Hot reload         | 2-3 sec    | < 1 sec    | < 1 sec    |
| Container start    | 10 sec     | 5 sec      | 3 sec      |
| Memory usage       | 500MB      | 400MB      | 350MB      |

## Advanced Stuff

Once you're comfortable with the basics, here are some power-user features:

**Custom Overrides:**
Create a `docker-compose.override.yml` (gitignored) for personal settings:

```yaml
services:
  landing:
    environment:
      - MY_CUSTOM_ENV=value
    ports:
      - '3001:3000' # Use a different port
```

**Multiple Apps:**
When we add more apps to the monorepo, they'll each get their own container:

```bash
docker-compose up          # Start everything
docker-compose up landing   # Just the landing page
docker-compose up docs-hub  # Just the docs (future)
```

**Production Builds:**
I've also created a production Dockerfile that creates optimized builds:

```bash
docker build -f docker/production/Dockerfile -t anbu-landing:prod .
```

## Final Thoughts

This Docker setup has saved me countless hours of debugging platform-specific issues. Yes, there's a small learning curve if you're new to Docker, but trust me - it's worth it. No more lockfile conflicts, no more dependency hell, just consistent development across all platforms.

If you run into issues not covered here, hit me up. I've probably encountered it and forgot to document the solution. And if you find ways to improve this setup, please share - I'm always looking to optimize our workflow.

Remember: when in doubt, `pnpm docker:clean && pnpm docker:landing:build` fixes 90% of problems.

Happy coding!

-- Francisco
