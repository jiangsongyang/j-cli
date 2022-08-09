import { resolve } from 'path'
import { loadEnv } from 'vite'

import type { AliasOptions, BuildOptions, ConfigEnv, ServerOptions, UserConfig } from 'vite'

// vite plugins
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'
import eslint from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'

// node modules

type TEvn = Record<string, string>

export const createBuild: (env: TEvn) => BuildOptions = env => ({
  sourcemap: env.VITE_SERVER_MODE === 'development',
  minify: 'esbuild',
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        library: ['antd'],
      },
    },
  },
  polyfillModulePreload: true,
})

export const createViteAlias: (root: string) => AliasOptions = root => [
  {
    find: '@',
    replacement: resolve(root, 'src'),
  },
]

export const createViteServer: (env: TEvn) => ServerOptions = env => ({
  host: true,
  open: false,
  https: env.VITE_SERVER_HTTPS === 'true',
  port: Number(env.VITE_SERVER_PORT),
})

export const createVitePlugins = (env: TEvn) => {
  const plugins = []

  // install react plugin
  plugins.push(react())
  // install eslint plugin
  plugins.push(eslint())
  // install checker plugin
  plugins.push(checker({ typescript: true }))
  // install legacy plugin
  plugins.push(
    legacy({
      targets: ['defaults', 'not IE 11'],
    })
  )
  // install inspect plugin
  plugins.push(Inspect())
  // install visualizer plugin
  plugins.push(visualizer({ open: env.VITE_VISUALIZER_AUTO_OPEN === 'true' }))

  return plugins
}

const createViteConfig = ({ mode }: ConfigEnv): UserConfig => {
  // get root path
  const root = process.cwd()
  // get env
  const env = loadEnv(mode, root)

  return {
    root,
    build: createBuild(env),
    resolve: {
      alias: createViteAlias(root),
    },
    server: createViteServer(env),
    plugins: createVitePlugins(env),
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  }
}

// https://vitejs.dev/config/
export default createViteConfig
