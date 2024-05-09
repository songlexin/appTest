import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteESLint from 'vite-plugin-eslint';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const path = require('path');

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

export default defineConfig({
  base: '/srmApp',
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    viteESLint(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 8000,
    proxy: {
      '^/api': {
        // target: 'http://xcdev.cmic.com.cn',
        target: 'http://xctest.cmic.com.cn:8080/',
        changeOrigin: true,
      },
    },
  },
});
