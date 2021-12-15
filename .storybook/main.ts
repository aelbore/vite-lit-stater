import litcss from 'rollup-plugin-postcss-lit'
import { viteLit } from 'rollup-plugin-lit-transformer'
import { join, relative, resolve } from 'path'
import { UserConfig } from 'vite'
 
const stories = (root: string) => 
  join(relative(
    root,
    resolve(__dirname, '../stories')
  ), '**/*.stories.ts')

const config = {
  framework: "@storybook/web-components",
  stories: [ 
    "../stories/**/*.stories.ts" 
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: {
    "builder": "storybook-builder-vite"
  },
  viteFinal(config: UserConfig, { configType }) {
    const env = configType.toLowerCase()
    config.esbuild = false
    config.plugins = [
      ...config.plugins,
      viteLit({ env, minifyHTMLLiterals: env.includes('production') }),
      litcss()
    ]
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

export default config