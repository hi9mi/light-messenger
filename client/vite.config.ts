import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@lm-client': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['effector/babel-plugin'],
        babelrc: true,
        configFile: true,
      },
    }),
  ],
});
