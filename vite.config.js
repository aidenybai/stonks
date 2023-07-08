import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';
import million from './million/compiler.mjs';

export default defineConfig({
  plugins: [million.vite(), react(), Inspect()],
});
