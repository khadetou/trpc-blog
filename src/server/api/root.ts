import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { postRouter } from "@/server/api/routers/post";
import { tagRouter } from "@/server/api/routers/tag";
import { userRouter } from "@/server/api/routers/user";
import { unsplashRouter } from "@/server/api/routers/unsplash";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  post: postRouter,
  user: userRouter,
  tag: tagRouter,
  unsplash: unsplashRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
