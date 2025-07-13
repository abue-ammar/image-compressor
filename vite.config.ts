import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,
    host: "0.0.0.0",
  },
  build: {
    target: "esnext", // or 'es2017' for broader support
    minify: "esbuild", // default, but explicit
    sourcemap: false, // don't generate source maps in production
    rollupOptions: {
      // external: ['react', 'react-dom'], // Uncomment if loading from CDN
      treeshake: true,
    },
  },
});
