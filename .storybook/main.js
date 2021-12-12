const litcss = require('rollup-plugin-postcss-lit')
const inlineLit = require('rollup-plugin-lit-transformer')
const path = require('path')

const config = {
  framework: "@storybook/web-components",
  stories: [ '../stories/**/*.stories.@(js|jsx|ts|tsx)' ],
  core: {
    "builder": 'storybook-builder-vite'
  },
  async viteFinal(config) {
    config.esbuild = false
    config.plugins.push(inlineLit.viteLit())
    config.plugins.push(litcss())
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...config.optimizeDeps.include,
        '@storybook/web-components'
      ],
      entries: [
        `${path.relative(
            config.root, 
            path.resolve(__dirname, '../stories')
          )}/**/*.stories.ts`
      ]
    }
    return config
  }
}

module.exports = config