import { transformLit } from 'rollup-plugin-lit-transformer'
import { createFilter } from '@rollup/pluginutils';
import { defineConfig, Plugin, ViteDevServer } from 'vite'
import litcss from 'rollup-plugin-postcss-lit';

const litVitePlugin = () => {
  const filter = createFilter(/\.(ts|js)$/i);
  const plugin: Plugin = {
    name: 'lit-vite-plugin',
    enforce: 'pre',
    configureServer(server: ViteDevServer) {
      server.watcher.on('change', (path: string) => {
        server.ws.send({ type: 'full-reload', path })
      })
    },
    transform(code: string, id: string) {
      if (!filter(id)) return null;
      return transformLit(code, id)
    }
  }
  return plugin
}

export default defineConfig({
  esbuild: false,
  plugins: [ litVitePlugin(), litcss() ]
})