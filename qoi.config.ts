import { defineConfig, InputPlugin } from 'qoi-cli'
import { Lit } from 'rollup-plugin-lit-element'

import { compilerOptions } from './tsconfig.json'

export default defineConfig({
  external: [ 'lit/decorators.js', 'lit' ],
  swc: {
    jsc: { 
      target: 'es2022',
      paths: compilerOptions.paths
    }
  },
  plugins: [ Lit() as InputPlugin ]
})