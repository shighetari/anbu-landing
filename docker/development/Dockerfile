# Development Dockerfile for ANBU Landing Page Monorepo
FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Set working directory
WORKDIR /app

# Development stage
FROM base AS dev

# Install dependencies for better development experience
RUN apk add --no-cache git

# Copy package files
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Expose ports
EXPOSE 3000 3001 3002

# Default command (can be overridden in docker-compose)
CMD ["pnpm", "dev"]