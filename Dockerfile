FROM oven/bun:1.2.5 as builder

WORKDIR /app

# Copy package.json and bun.lock
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1.2.5-slim

WORKDIR /app

# Install Python
RUN apt-get update && apt-get install -y python3 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the built application from the builder stage
COPY --from=builder /app/server ./server

# Copy auth.ts config
COPY --from=builder /app/src/lib/auth.ts ./src/lib/auth.ts

# Run pre-deploy commands and start the server
CMD bunx @better-auth/cli generate --y && bunx @better-auth/cli migrate --y && ./server