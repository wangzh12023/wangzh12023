import { defineConfig } from 'vite';

// Worktrees share dependencies but keep independent development caches.
export default defineConfig({ cacheDir: '.vite-cache' });
