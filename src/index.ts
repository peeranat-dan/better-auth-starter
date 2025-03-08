import { Hono } from 'hono'
import { auth } from './lib/auth'
import { logger } from 'hono/logger'
const app = new Hono()

app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default app
