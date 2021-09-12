import { inlineLitElement } from 'rollup-plugin-lit-transformer'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [ inlineLitElement({ enforce: 'pre' }) ]
})