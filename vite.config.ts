import { defineConfig } from 'vite'
import { ViteLit } from 'rollup-plugin-lit-element'

export default defineConfig({
  esbuild: false,
  plugins: [ ViteLit() ],
  test: {
    globals: true,
    include: [ 'test/**/*.test.ts' ],
    environment: 'happy-dom',
    css: true,
    reporters: [ 'verbose' ],
    coverage: {
      cleanOnRerun: true,
      reporter: [ 'text', 'html' ]
    }
  }
})