import { ViteLit } from 'rollup-plugin-lit-element'
import { mergeConfig } from 'vite'

import type { UserConfig, ViteDevServer } from 'vite'
import type { StorybookViteConfig } from '@storybook/builder-vite'

export default {
  framework: "@storybook/web-components",
  stories: [ 
    "../stories/**/*.stories.ts" 
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: {
    "builder": '@storybook/builder-vite',
    "disableTelemetry": true
  },
  viteFinal(config: UserConfig) {
    return mergeConfig(config, {
      esbuild: false,
      plugins: [ 
        {
          name: 'watcher',
          configureServer({ watcher, ws }: ViteDevServer) {
            watcher.on('change', (path: string) => {
              ws.send({ type: 'full-reload', path })
            })
          }
        },
        ViteLit()
      ]
    })
  }
} as StorybookViteConfig