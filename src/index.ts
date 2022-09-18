import { createTRPCClient } from '@trpc/client';
import type { AstroIntegration } from 'astro';
import type { CreateTRPCClientOptions } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

function initTRPCClient<TRouter extends AnyRouter>(
    config: CreateTRPCClientOptions<TRouter>
) {
    const client = createTRPCClient(config);
    globalThis.TRPCClient = client;
}

export default function astroTRPCIntegration<TRouter extends AnyRouter = any>(
    options: CreateTRPCClientOptions<TRouter>
): AstroIntegration {
    return {
        name: 'astro-trpc',
        hooks: {
            'astro:config:setup': () => {
                initTRPCClient(options);
            },
        },
    };
}
