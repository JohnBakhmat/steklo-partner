// @ts-check
import { defineConfig } from 'astro/config';
import { default as UnoCSS } from "unocss/astro";

// https://astro.build/config
export default defineConfig({
    integrations: [UnoCSS({
        injectReset: true
    })],
});
