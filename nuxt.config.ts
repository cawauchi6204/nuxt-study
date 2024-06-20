// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      openWeatherApiKey: process.env.NUXT_PUBLIC_OPEN_WEATHER_API_KEY,
    },
  },
});
