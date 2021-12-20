import { defineConfig } from '@qoi/build'
import { inlineLitElement } from 'rollup-plugin-lit-transformer'

export default defineConfig({
  plugins: [ 
    inlineLitElement({ 
      enforce: 'pre', 
      minifyHTMLLiterals: true 
    }) 
  ]
})