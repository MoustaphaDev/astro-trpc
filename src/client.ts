import type { TRPCClient } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export function useTRPCClient<
    TRouter extends AnyRouter
>(): TRPCClient<TRouter> {
    if (!globalThis.TRPCClient) {
        console.error('The tRPC client has not been properly initialized');
    }

    return globalThis.TRPCClient;
}
