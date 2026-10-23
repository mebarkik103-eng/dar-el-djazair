import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-zip-attachments',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && (req.url.endsWith('.zip') || req.url.includes('.zip?'))) {
              const urlClean = req.url.split('?')[0];
              const filename = urlClean.split('/').pop() || 'dar-el-djazair-source.zip';
              res.setHeader('Content-Type', 'application/zip');
              res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
              res.setHeader('Access-Control-Allow-Origin', '*');
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
