import {
    defineConfig,
    presetIcons,
    presetWebFonts,
    presetWind4,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";

export default defineConfig({
    transformers: [transformerDirectives(), transformerVariantGroup()],
    presets: [presetWind4(), presetIcons(), presetWebFonts()],
    theme: {
        colors: {
            accent: "#FFDA7C"
        }
    }
});
