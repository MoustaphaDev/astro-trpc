import { defineConfig } from 'astro/config';
import astroTRPC from 'astro-trpc';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: node(),
    integrations: [
        astroTRPC({
            url: 'http://localhost:3000/api/trpc',
        }),
    ],
});
