import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/patient',
  plugins: [
    vue(),
    Components({
      // 不开启自动导入声明文件
      dts: false,
      // Toast Comfirm 这类组件的样式还是需要单独引入, 关闭自动引入
      resolvers: [VantResolver({})]
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹, 绝对路径(Node代码)
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'svg-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
