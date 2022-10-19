import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  //@ts-expect-error
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup.ts',
    silent: true,
  },
  resolve: {
    alias: {
      '@lm-client': path.resolve(__dirname, 'src'),
    },
  },
});
