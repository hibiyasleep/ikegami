import packageinfo from './package.json'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { tarball } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [
    vue(),
    mode === 'production' && tarball({
      dest: `${packageinfo.name}-${packageinfo.version}`
    })
  ],
  resolve: {
    alias: {
      '@': __dirname,
      //'vue': 'vue/dist/vue.common'
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import '@/styles/_variables.sass'\n`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9000,
    strictPort: true
  }
}))
