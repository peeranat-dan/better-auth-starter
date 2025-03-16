import { Hono } from 'hono'
import { auth } from './lib/auth'
import { logger } from 'hono/logger'
const app = new Hono()

app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

// BetterAuth routes, see docs before changing
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default app
