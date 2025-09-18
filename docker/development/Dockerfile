# Development Dockerfile for ANBU Landing Page Monorepo
FROM node:20-alpine AS base

# Install pnpm and required tools (wget for health checks, git for dependencies)
RUN apk add --no-cache git curl wget && \
    corepack enable && \
    corepack prepare pnpm@8.15.0 --activate

# Set working directory
WORKDIR /app

# Development stage with optimized caching
FROM base AS dev

# Copy workspace configuration files first (least likely to change)
COPY pnpm-workspace.yaml turbo.json ./

# Copy root package.json and lockfile for workspace dependencies
COPY package.json pnpm-lock.yaml ./

# Copy all package.json files for dependency resolution
COPY apps/landing/package.json ./apps/landing/
# Future apps can be added here when created:
# COPY apps/docs-hub/package.json ./apps/docs-hub/
# COPY apps/solutions-portal/package.json ./apps/solutions-portal/

# Install dependencies with better caching
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline

# Copy source code (most likely to change)
COPY . .

# Create empty directories for future apps to prevent errors
RUN mkdir -p apps/docs-hub apps/solutions-portal packages

# Set up hot reload for Windows compatibility
ENV WATCHPACK_POLLING=true \
    CHOKIDAR_USEPOLLING=true \
    NODE_ENV=development

# Expose port for landing app
EXPOSE 3000

# Health check endpoint (using wget for better cross-platform support)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Default command 
CMD ["pnpm", "dev", "--filter=landing"]