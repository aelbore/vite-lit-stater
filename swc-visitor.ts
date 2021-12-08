import type { OutputOptions } from 'rollup'
import type { PackageJson } from '@qoi/types'
import { defineConfig, copy } from '@qoi/build'

export default defineConfig({
  input: './node_modules/@swc/core/Visitor.js',
  plugins: [
    copy({
      targets: [{ 
        src: './node_modules/@swc/core/Visitor.d.ts',
        dest: './node_modules/@swc/visitor',
      },{
        src: './node_modules/@swc/core/types.d.ts',
        dest: './node_modules/@swc/visitor'
      }]
    })
  ],
  output(options: OutputOptions) {
    const opts = {
      ...options,
      entryFileNames: 'Visitor.js',
      exports: 'named'
    } as OutputOptions
    return opts
  },
  packageJson(pkg: PackageJson) {
    const modules = {
      "require": "./cjs/Visitor.js",
      "import": "./Visitor.js"
    }
    return {
      name: "@swc/visitor",
      version: "0.0.1",
      main: "Visitor.js",
      module: "Visitor.js",
      type: "module",
      exports: {
        ".": { ...modules },
        "./Visitor.js": { ...modules }
      },
      types: "Visitor.d.ts"
    }
  }
})