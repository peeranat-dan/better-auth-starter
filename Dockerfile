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
RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app

# Copy auth.ts separately for pre-deploy usage
COPY auth.ts /app/auth.ts

# Copy the built application from the builder stage
COPY --from=builder /app/server ./server

# Command to run the application
CMD ["./server"]
