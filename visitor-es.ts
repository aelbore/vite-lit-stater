import { join } from 'path'
import { mkdir, writeFile, copyFile } from 'fs/promises'

import { rollup } from 'rollup'
import { clean } from '@qoi/fs'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

(async function() {
  const DEST_FOLDER = './node_modules/@swc/visitor'

  await clean(DEST_FOLDER)
  await mkdir(DEST_FOLDER, { recursive: true })

  const bundle = await rollup({
    input: './node_modules/@swc/core/Visitor.js',
    plugins: [ resolve(), commonjs() ]
  })
  await bundle.write({ dir: DEST_FOLDER, format: 'es' })

  const pkg = JSON.stringify({ 
    type: 'module', 
    main: 'Visitor.js', 
    types: 'Visitor.d.ts' 
  }, null, 2)
  
  await writeFile(join(DEST_FOLDER, 'package.json'), pkg)
  await copyFile('./node_modules/@swc/core/Visitor.d.ts', './node_modules/@swc/visitor/Visitor.d.ts') 
})()