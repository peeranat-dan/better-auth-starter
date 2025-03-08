import { betterAuth } from "better-auth"
import { Pool } from "pg"
import { createClient } from "redis"

const redis = createClient({
  url: process.env.REDIS_URL,
})

redis.connect().catch(console.error)

// Check better-auth docs for more info https://www.better-auth.com/docs/
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  // This is for the redis session storage
  secondaryStorage: {
    get: async (key) => {
      const value = await redis.get(key)
      return value ? JSON.stringify(value) : null
    },
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, { EX: ttl })
      // or for ioredis:
      // if (ttl) await redis.set(key, value, 'EX', ttl)
      else await redis.set(key, value)
    },
    delete: async (key) => {
      await redis.del(key)
    },
  },
})
