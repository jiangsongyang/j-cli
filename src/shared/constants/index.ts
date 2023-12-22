import { fileURLToPath } from 'node:url'

export const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const PWD = process.cwd()
