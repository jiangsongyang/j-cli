import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import pkg from './package.json'

export default (commandLineArgs) => {
  const isDev = commandLineArgs.watch
  const isProduction = !isDev
  return {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        file: pkg.main,
        sourcemap: !isProduction,
      },
      {
        format: 'es',
        file: pkg.module,
        sourcemap: !isProduction,
      },
    ],
    treeshake: {
      moduleSideEffects: 'no-external',
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
    plugins: [
      json(),
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
        exclude: [],
      }),
      babel({
        exclude: '**/node_modules/**',
      }),
      typescript(),
    ],
  }
}
