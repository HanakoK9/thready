// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

// import { postRouter } from "./post";
import { protectedTweetRouter } from "./protectedTweet";

export const appRouter = createRouter()
  .transformer(superjson)
  // .merge("post.", postRouter)
  .merge("protectedTweet.", protectedTweetRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
