// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },

	future: {
		compatibilityVersion: 4
	},

	modules: ["@nuxtjs/tailwindcss", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image"],

	css: ["./assets/css/tailwind.css"],

	fonts: {
		families: [
			{name: "Roboto Mono", provider: "fontsource"}
		]
	}
})
