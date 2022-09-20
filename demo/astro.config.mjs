import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import astroTRPC from 'astro-trpc';

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
