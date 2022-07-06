import { defineConfig } from 'vite'
import { ViteLit } from 'rollup-plugin-lit-element'

export default defineConfig({
  esbuild: false,
  plugins: [ ViteLit() ]
})