import { createAstroTRPCApiHandler } from 'astro-trpc/server';
import * as trpc from '@trpc/server';
import { z } from 'zod';
export const appRouter = trpc.router().query('greeting', {
    input: z
        .object({
            text: z.string().nullish(),
        })
        .nullish(),
    resolve({ input }) {
        return {
            greeting: `hello ${input?.text ?? 'world!'}`,
        };
    },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export const all = createAstroTRPCApiHandler({
    router: appRouter,
    createContext: () => null,
});
