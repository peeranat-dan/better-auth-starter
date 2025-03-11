To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000


Needed env vars: `REDIS_URL`, `DATABASE_URL` and `BETTER_AUTH_SECRET`
Pre deploy command: `bunx @better-auth/cli generate --y && bunx @better-auth/cli migrate --y`