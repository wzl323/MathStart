import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/static/image')
    },
  },
  build: {
    sourcemap: true,
  }
});
