import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { Pool } from "pg";
import Redis from "ioredis";

// Create Redis client with proper type checking for REDIS_URL
const redis = new Redis(process.env.REDIS_URL || "");

// Error handler for Redis connection
redis.on("error", (err) => {
	console.error("Redis connection error:", err);
});

// Connection ready handler
redis.on("ready", () => {
	console.log("Redis ready");
});

// Check better-auth docs for more info https://www.better-auth.com/docs/
export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	// Session config
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	// Add your plugins here
	plugins: [openAPI()],
	// DB config
	database: new Pool({
		connectionString: process.env.DATABASE_URL,
		log: console.log,
	}),
	// This is for the redis session storage
	secondaryStorage: {
		get: async (key) => {
			const value = await redis.get(key);
			return value ? value : null;
		},
		set: async (key, value, ttl) => {
			if (ttl) {
				await redis.set(key, value, "EX", ttl);
			} else {
				await redis.set(key, value);
			}
		},
		delete: async (key) => {
			await redis.del(key);
		},
	},
});
