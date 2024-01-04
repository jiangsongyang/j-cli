import fs from 'fs'
import { fileURLToPath } from 'node:url'
import path from 'path'

export const __dirname = fileURLToPath(new URL('.', import.meta.url))

const main = () => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))

  const { bin } = pkg
  const { jsy } = bin

  const filePath = path.resolve(__dirname, '../', jsy)

  const content = fs.readFileSync(filePath, 'utf-8')
  fs.writeFileSync(filePath, `#!/usr/bin/env node \n${content}`, 'utf-8')
}

main()
