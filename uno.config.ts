import {
	defineConfig,
	presetIcons,
	presetWebFonts,
	presetWind3,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	transformers: [transformerDirectives(), transformerVariantGroup()],
	presets: [presetWind3(), presetIcons(), presetWebFonts()],
	theme: {
		colors: {
			accent: "#FFDA7C",
		},
	},
});
