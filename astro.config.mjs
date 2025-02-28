// @ts-check
import { defineConfig } from "astro/config";
import { default as UnoCSS } from "unocss/astro";

import { default as deno } from "@deno/astro-adapter";

// https://astro.build/config
export default defineConfig({
    integrations: [
        UnoCSS({
            injectReset: true,
        }),
    ],
    experimental: {
        svg: true,
    },
    adapter: deno()
});
