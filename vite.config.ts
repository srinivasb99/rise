import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  server: {
    host: true, // Allows access from external devices if needed
    port: 3000, // Specify your desired port
  },
  build: {
    outDir: 'dist', // Output directory for build files
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Allows you to use `@` as an alias for the `/src` directory
    },
  },
  base: '/', // Ensures correct base path for deployment
});
