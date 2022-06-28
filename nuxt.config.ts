import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            WEATHER_APP_KEY : process.env.WEATHER_APP_KEY
        },
        private: {
            HELLO : "this is the world"
        }
    },
    css: ["~/assets/css/main.css"],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer : {}
                }
            }
        }
    }
})
