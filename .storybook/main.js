const litcss = require('rollup-plugin-postcss-lit')
const inlineLit = require('rollup-plugin-lit-transformer')
const path = require('path')

const stories = (root) => 
  path.join(path.relative(
    root,
    path.resolve(__dirname, '../stories')
  ), '**/*.stories.ts')

const config = {
  framework: "@storybook/web-components",
  stories: [ '../stories/**/*.stories.@(js|jsx|ts|tsx)' ],
  core: {
    "builder": 'storybook-builder-vite'
  },
  viteFinal(config, { configType }) {
    const env = configType.toLowerCase()
    config.esbuild = false
    config.plugins.push(inlineLit.viteLit({ 
      env,
      minifyHTMLLiterals: env.includes('production')
    }))
    config.plugins.push(litcss())
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...config?.optimizeDeps?.include || [],
        '@storybook/web-components'
      ],
      entries: [ stories(config.root) ]
    }
    return config
  }
}

module.exports = config