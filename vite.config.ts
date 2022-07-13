import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import envCompatible from 'vite-plugin-env-compatible';

process.env.VUE_APP_BUILD_TIME = Date.now().toString();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),envCompatible()],
  base: "/phabTemplateBuilder/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
