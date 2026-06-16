import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
    plugins: [react()],
    // Relative paths in production so Live Server can serve dist/
    base: command === 'build' ? './' : '/',
    server: {
        port: 5173,
        open: true,
    },
}));