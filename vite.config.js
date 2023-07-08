import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';
import million from '/Users/aidenybai/Projects/aidenybai/million/packages/compiler/index.ts';

export default defineConfig({
  plugins: [million.vite(), react(), Inspect()],
});
