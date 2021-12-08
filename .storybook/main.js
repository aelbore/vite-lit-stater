const litcss = require('rollup-plugin-postcss-lit')
const inlineLit = require('rollup-plugin-lit-transformer')
const utils = require('@rollup/pluginutils')

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
    config.plugins.push(litVitePlugin())
    config.plugins.push(litcss())
    return config
  }
}

module.exports = config