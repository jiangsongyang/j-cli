import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'rollup'
import type { RollupOptions } from 'rollup'

import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const COMMON_CONFIG: RollupOptions = {
  input: path.resolve(__dirname, 'src/index.ts'),
}

const COMMON_PLUGINS = [
  nodeResolve(),
  commonjs(),
  typescript({
    tsconfig: resolve(__dirname, './tsconfig.json'),
  }),
]

const createEmsRollupConfig = () => {
  const config: RollupOptions = {
    ...COMMON_CONFIG,
    plugins: [...COMMON_PLUGINS],
    output: {
      file: path.resolve(__dirname, 'dist', 'index.js'),
      format: 'cjs',
    },
  }

  return config
}

const createCommonJSRollupConfig = () => {
  const config: RollupOptions = {
    ...COMMON_CONFIG,
    plugins: [...COMMON_PLUGINS],
    output: {
      file: path.resolve(__dirname, 'dist', 'index.mjs'),
      format: 'esm',
    },
  }

  return config
}

export default defineConfig([createEmsRollupConfig(), createCommonJSRollupConfig()])
