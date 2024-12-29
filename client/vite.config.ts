import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import { ViteEjsPlugin } from "vite-plugin-ejs"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    vue(),
    ViteEjsPlugin(viteConfig => {
      const env = loadEnv(viteConfig.mode, "./");
      return {
        TOKEN: env.VITE_TOKEN
      }
    })
  ],
  base: "./"
})
