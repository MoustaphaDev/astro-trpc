import { createAstroApiHandler } from 'astro-trpc';

import * as trpc from '@trpc/server';
import { z } from 'zod';
export const appRouter = trpc
    .router()
    .query('hey', {
        input: z
            .object({
                text: z.string().nullish(),
            })
            .nullish(),
        resolve({ input }) {
            return {
                greeting: `hello ${input?.text ?? 'world'}`,
            };
        },
    })
    .query('yooo', {
        input: z
            .object({
                text: z.string().nullish(),
            })
            .nullish(),
        resolve({ input }) {
            return {
                greeting: `Yoo ${input?.text ?? 'bro'}`,
            };
        },
    });
// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export const all = createAstroApiHandler({
    router: appRouter,
    createContext: () => null,
});
