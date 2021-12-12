import { defineConfig } from 'vite'
import { viteLit } from 'rollup-plugin-lit-transformer'
import litcss from 'rollup-plugin-postcss-lit'

export default defineConfig({
  esbuild: false,
  plugins: [ viteLit(), litcss() ]
})