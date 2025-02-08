import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative paths for deployment
  build: {
    outDir: 'dist', // Output directory for the production build
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
    minify: 'terser', // Minify the output
    sourcemap: false, // Disable source maps for production
  },
});