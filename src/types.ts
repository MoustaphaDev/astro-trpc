import type { APIContext } from 'astro';
import type { AnyRouter, inferRouterContext } from '@trpc/server';

export type CreateContextFn<TRouter extends AnyRouter> = (
    APIContext: APIContext
) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;
