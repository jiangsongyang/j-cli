import { resolve } from 'node:path'
import { createReadStream, createWriteStream, existsSync, mkdir, readdir, stat } from 'node:fs'
import type { MakeDirectoryOptions } from 'node:fs'
import type { TemplateType } from '../../templates'

export const genTemplate = async (templateType: TemplateType, projectName: string) => {
  const root = process.cwd()
  const dirPath = resolve(__dirname, `./templates`)

  const templateName = parseTemplateType(templateType)
  await startMkdir(`${root}/${projectName}`, { recursive: true })
  exists(`${dirPath}/${templateName}`, `${root}/${projectName}`, copyDir)
}

const parseTemplateType = (templateType: TemplateType) => {
  switch (templateType) {
    case 'wtr':
      return 'webpack-ts-react'
    case 'rtw':
      return 'rollup-ts-webpack'
    case 'rtn':
      return 'rollup-ts-node'
    default:
      throw new Error('template type not support')
  }
}

const startMkdir = async (src: string, option?: MakeDirectoryOptions) => {
  return new Promise((resolve, reject) => {
    mkdir(src, option, err => {
      if (err) {
        reject(err)
      }
      resolve(src)
    })
  })
}

const copyDir = (src: string, dst: string) => {
  readdir(src, (err, paths) => {
    if (err) {
      throw err
    }
    paths.forEach(path => {
      const _src = `${src}/${path}`
      const _dst = `${dst}/${path}`
      let readable
      let writable
      stat(_src, (err, st) => {
        if (err) {
          throw err
        }
        if (st.isFile()) {
          readable = createReadStream(_src)
          writable = createWriteStream(_dst)
          readable.pipe(writable)
        } else if (st.isDirectory()) {
          exists(_src, _dst, copyDir)
        }
      })
    })
  })
}

type CopyDirFn = (src: string, dst: string) => void

const exists = (src: string, dst: string, callback: CopyDirFn) => {
  if (existsSync(dst)) {
    callback(src, dst)
  } else {
    mkdir(dst, () => {
      callback(src, dst)
    })
  }
}
