# multiple-prisma-schemas-on-vercel

This is an example of how to use **multiple** prisma setups (unique databases and schemas) in a single API route in nextjs, when you run up against size constraints of a lambda.

See this Prisma-related [GitHub discussion](https://github.com/prisma/prisma/discussions/16297#discussioncomment-4390497) for more information.

## About this setup

- It uses `pnpm` and a monorepo setup
- `packages/users` and `packages/posts` are unique prisma setups, pointing to different databases with different schemas.
- Use `docker-compose` to run locally.
- Running `prisma generate` in both `users` and `posts` will place the client file into `packages/prisma`. 

```
// file:packages/posts/prisma/schema.prisma
// NOTE: See "output" pathname

generator client {
  provider = "prisma-client-js"
  output   = "../../prisma/posts"
}
```

- And they import prisma clients from that package/directory also.

```
// file: packages/posts/index.ts
// NOTE: Notice that "myprisma" is the name of our package in packages/prisma folder

import { PrismaClient } from 'myprisma/posts'
export const posts = new PrismaClient()
```

## `packages/prisma`

- The `mv-engine` npm script calls the `mv-engine.mjs` to:
  - Glob all prisma engine files (there will be one each in `packages/prisma/users|posts`)
  - Put a single engine file in `packages/prisma/.prisma`.
  - IMPORTANT: Prisma knows to look for this file in [`.prisma` location](https://github.com/prisma/prisma/blob/62b4e564b436e2e42853ce42cddfbd3dfdb7d891/packages/client/src/runtime/core/engines/common/resolveEnginePath.ts#L94)
  - `packages/prisma/index.js` exists just to make sure Vercel bundles the engine library. Yes, it's annoying.