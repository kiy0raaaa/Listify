import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
    plugins: [react()],
    // Use absolute base for Vercel, relative for local preview
    base: '/',
    server: {
        port: 5173,
        open: true,
    },
}));