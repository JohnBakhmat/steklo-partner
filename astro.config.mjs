// @ts-check
import { defineConfig } from "astro/config";
import { default as UnoCSS } from "unocss/astro";

import { default as deno } from "@deno/astro-adapter";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    integrations: [UnoCSS({
        injectReset: true,
		}), react()],
    experimental: {
        svg: true,
    },
    adapter: deno(),
});