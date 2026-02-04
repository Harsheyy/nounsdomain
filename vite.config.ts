import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ["import", "global-builtin", "color-functions"],
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const parts = id.split("node_modules/")[1]?.split("/");
            if (parts && parts.length > 0) {
              const scope = parts[0].startsWith("@") && parts.length > 1
                ? `${parts[0]}/${parts[1]}`
                : parts[0];
              return `vendor/${scope}`;
            }
            return "vendor";
          }
          return undefined;
        },
      },
    },
  },
})
