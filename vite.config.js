import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    copyPublicDir: true,
  },
  publicDir: 'public',
  resolve: {
    alias: {
      'reveal.js': resolve(__dirname, 'node_modules/reveal.js'),
    },
  },
});
