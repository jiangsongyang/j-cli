import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { genPrompts } from './genPrompts'

const cwd = process.cwd()

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
}

function emptyDir(dir: string) {
  if (!existsSync(dir)) {
    return
  }
  for (const file of readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    rmSync(resolve(dir, file), { recursive: true, force: true })
  }
}

function copyDir(srcDir: string, destDir: string) {
  mkdirSync(destDir, { recursive: true })
  for (const file of readdirSync(srcDir)) {
    const srcFile = resolve(srcDir, file)
    const destFile = resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function copy(src: string, dest: string) {
  const stat = statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    copyFileSync(src, dest)
  }
}

export const create = async (projectName: string | null = null) => {
  const userSelectResult = await genPrompts(projectName)

  const {
    projectName: finallyProjectName,
    overwrite,
    packageName,
    framework,
    variant,
  } = userSelectResult!

  const root = join(cwd, finallyProjectName)

  if (overwrite === 'yes') {
    emptyDir(root)
  } else if (!existsSync(root)) {
    mkdirSync(root, { recursive: true })
  }

  const template: string = variant || framework?.name

  const templateDir = resolve(fileURLToPath(import.meta.url), '../', `template-${template}`)

  const write = (file: string, content?: string) => {
    const targetPath = join(root, renameFiles[file] ?? file)
    if (content) {
      writeFileSync(targetPath, content)
    } else {
      copy(join(templateDir, file), targetPath)
    }
  }

  const files = readdirSync(templateDir)

  for (const file of files.filter(f => f !== 'package.json')) {
    write(file)
  }

  console.log(join(templateDir, `package.json`))

  const pkg = JSON.parse(readFileSync(join(templateDir, `package.json`), 'utf-8'))

  pkg.name = packageName

  write('package.json', `${JSON.stringify(pkg, null, 2)}\n`)

  console.log(`\nDone. Now run:\n`)
  console.log(`  cd ${finallyProjectName}`)
  console.log(`  pnpm install`)
  console.log(`  pnpm run dev`)
}
