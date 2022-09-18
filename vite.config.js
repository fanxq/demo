import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from "vite-plugin-imp"
import postcssPxToViewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://gateway.lizhi.io/demo/login.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPxToViewport({
          unitToConvert: 'px',
          viewportWidth: 750,
          unitPrecision: 3,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['ant-'],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: []
        })
      ]
    }
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => {
            if (name === "col" || name === "row") {
              return "antd/lib/grid/style/index.css";
            }
            return `antd/es/${name}/style/index.css`;
          },
        },
      ],
    })
  ]
})
