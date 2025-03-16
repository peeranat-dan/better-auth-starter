## Better Auth starter template

#### Considerations
- I strongly encourage FORKING THIS REPO and modifying the config to you likings, add other providers,
 email sending, etc...
- You can use the same DB for your app and this auth server, just be careful with the migrations
- You can use the endpoints or use better-auth on the client side and [set the base url in the config file](https://www.better-auth.com/docs/installation#create-client-instance)

#### Features
- email and password login and registration
- healthcheck endpoint
- openAPI plugin enabled
- session storage in redis

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