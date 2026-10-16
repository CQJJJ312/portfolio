import { defineConfig } from 'vite';

export default defineConfig(({ command, isPreview }) => ({
  // Keep local editing at /; the published project lives under /portfolio/.
  base: command === 'build' || isPreview ? '/portfolio/' : '/',
}));
