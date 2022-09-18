import { CreateContextFn } from './types';
import { resolveHTTPResponse, TRPCError } from '@trpc/server/';
import type { APIRoute } from 'astro';
import type { AnyRouter, Dict } from '@trpc/server/';
import type { HTTPRequest } from '@trpc/server/dist/declarations/src/http/internals/types';

export function createAstroTRPCApiHandler<TRouter extends AnyRouter>(opts: {
    router: TRouter;
    createContext: CreateContextFn<TRouter>;
}): APIRoute {
    return async (astroApiContext) => {
        if (typeof astroApiContext.params.trpc !== 'string') {
            const error = opts.router.getErrorShape({
                error: new TRPCError({
                    message:
                        'Query "trpc" not found - is the file named `[trpc]`.ts or `[...trpc].ts`?',
                    code: 'INTERNAL_SERVER_ERROR',
                }),
                type: 'unknown',
                ctx: undefined,
                path: undefined,
                input: undefined,
            });
            return new Response(
                JSON.stringify({
                    id: -1,
                    error,
                }),
                {
                    status: 500,
                }
            );
        }
        const customRequest = astroApiContext.request as Request & {
            headers: Dict<string | string[]>;
        };
        const customRequestUrl = new URL(customRequest.url);
        const req: HTTPRequest = {
            method: customRequest.method,
            headers: customRequest.headers,
            query: customRequestUrl.searchParams,
            body: await customRequest.text(),
        };

        const httpResponse = await resolveHTTPResponse({
            router: opts.router,
            req,
            path: astroApiContext.params.trpc,
            createContext: async () => opts.createContext?.(astroApiContext),
        });

        const { status, headers, body } = httpResponse as {
            status: number;
            headers: Record<string, string>;
            body: string;
        };
        return new Response(body, { status, headers });
    };
}
