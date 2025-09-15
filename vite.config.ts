import vue from "@vitejs/plugin-vue";

import { BootstrapVueNextResolver } from "bootstrap-vue-next/resolvers";
import Components from "unplugin-vue-components/vite";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
const host = process.env.TAURI_DEV_HOST;
// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
