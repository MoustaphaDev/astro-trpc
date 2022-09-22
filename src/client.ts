import { createTRPCClient } from '@trpc/client';
import type { CreateTRPCClientOptions } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export function createAstroTRPCClient<TRouter extends AnyRouter>(
    config: CreateTRPCClientOptions<TRouter>
) {
    const client = createTRPCClient(config);
    return client;
}
