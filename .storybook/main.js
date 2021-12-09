const litcss = require('rollup-plugin-postcss-lit')
const inlineLit = require('rollup-plugin-lit-transformer')
const utils = require('@rollup/pluginutils')
const path = require('path')

const litVitePlugin = () => {
  const filter = utils.createFilter(/\.(ts|js)$/i);
  const plugin = {
    name: 'lit-vite-plugin',
    enforce: 'pre',
    configureServer(server) {
      server.watcher.on('change', (path) => {
        server.ws.send({ type: 'full-reload', path })
      })
    },
    transform(code, id) {
      if (!filter(id)) return null;
      return inlineLit.transformLit(code, id)
    }
  }
  return plugin
}

const config = {
  framework: "@storybook/web-components",
  stories: [
      '../stories/**/*.stories.mdx',
      '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  core: {
    "builder": 'storybook-builder-vite',
  },
  async viteFinal(config, { configType }) {
    config.esbuild = false
    config.plugins.push(litVitePlugin())
    config.plugins.push(litcss())
    config.optimizeDeps = {
      include: [
        "lit-html",
        "lit-element",
        "lit-html/directive-helpers.js",
        "@lit/reactive-element",
        "@lit/reactive-element/css-tag.js",
        "ansi-to-html/lib/ansi_to_html.js"
      ],
      entries: [`${path.relative(config.root, path.resolve(__dirname, '../stories'))}/**/*.stories.ts`],
    }
    return config
  }
}

module.exports = config