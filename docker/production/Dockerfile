# Production Multi-stage Dockerfile for ANBU Landing Page Monorepo
FROM node:24-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Dependencies stage
FROM base AS deps

# Copy package files
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/

# Install production dependencies
RUN pnpm install --frozen-lockfile --prod

# Builder stage
FROM base AS builder

# Copy package files
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/*/package.json ./apps/
COPY packages/*/package.json ./packages/

# Install all dependencies (including dev)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
ARG APP_NAME
RUN pnpm turbo build --filter=${APP_NAME}

# Runner stage
FROM node:24-alpine AS runner

WORKDIR /app

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy necessary files from builder
ARG APP_NAME
COPY --from=builder /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV production

# Start the application
ARG APP_NAME
CMD ["node", "apps/${APP_NAME}/server.js"]