import path from 'path'
import fs from 'fs'

import { fileURLToPath } from 'node:url'

export const __dirname = fileURLToPath(new URL('.', import.meta.url))

function copyFileSync(source, target) {
  let targetFile = target

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

function copyFolderRecursiveSync(source, target) {
  console.log(source, target)
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source)
    files.forEach(file => {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, path.join(target, file))
      } else {
        copyFileSync(curSource, target)
      }
    })
  }
}

const main = () => {
  const templatesPath = path.resolve(__dirname, '../src/templates')
  const distPath = path.resolve(__dirname, '../dist')
  copyFolderRecursiveSync(templatesPath, distPath)
}

main()
