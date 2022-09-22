import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from '../pages/api/trpc/[trpc]';

export const client = createTRPCClient<AppRouter>({
    url:
        process.env.NODE_ENV === 'production'
            ? import.meta.env.TRPC_ENDPOINT_URL
            : `http://localhost:3000/api/trpc`,
});
