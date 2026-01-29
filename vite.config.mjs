import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icon')],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
  ],
  resolve: {
    alias: {
      'hooks': path.resolve(process.cwd(), 'src/hooks'),
      'components': path.resolve(process.cwd(), 'src/components'),
      'views': path.resolve(process.cwd(), 'src/views'),
      'icon': path.resolve(process.cwd(), 'src/icon'),
      'utils': path.resolve(process.cwd(), 'src/utils'),
    }
  }
});
