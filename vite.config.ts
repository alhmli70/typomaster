import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host ? { protocol: 'ws', host, port: 1421 } : undefined,
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      target: ['es2021', 'chrome100', 'safari13'],
      minify: (process.env.TAURI_DEBUG ? false : 'esbuild') as false | 'esbuild',
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  };
});
