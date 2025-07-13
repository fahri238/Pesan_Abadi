import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      // Ini memberitahu Vite di mana menemukan folder 'declarations'
      // yang dibuat oleh DFX.
      'declarations': path.resolve(__dirname, '../src/declarations'),
    },
  },
});
