import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import svgSpritePlugin from 'vite-plugin-svg-sprite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/CashBook-Demo-React/',
  plugins: [
    react(),
    svgr(), // 启用 svgr 插件
    svgSpritePlugin({
      symbolId: 'icon-[name]',
      include: ['src/icon/*.svg'],
    }),
  ],
  resolve: {
    alias: {
      // 兼容 CRA 的绝对路径导入，将常用目录指向 src/ 下的对应目录
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'components': path.resolve(__dirname, 'src/components'),
      'views': path.resolve(__dirname, 'src/views'),
      'icon': path.resolve(__dirname, 'src/icon'),
      'utils': path.resolve(__dirname, 'src/utils'),
    }
  }
});
