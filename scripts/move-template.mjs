import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createReadStream, createWriteStream, existsSync, mkdir, readdir, stat } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const moveTemplate = async () => {
  const root = resolve(__dirname, '../dist')
  const dirPath = resolve(root, '../src/templates')

  await startMkdir(`${root}/templates`, { recursive: true })
  exists(`${dirPath}`, `${root}/templates`, copyDir)
}

const startMkdir = async (src, option) => {
  return new Promise((resolve, reject) => {
    mkdir(src, option, err => {
      if (err) {
        reject(err)
      }
      resolve(src)
    })
  })
}

const copyDir = (src, dst) => {
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

const exists = (src, dst, callback) => {
  if (existsSync(dst)) {
    callback(src, dst)
  } else {
    mkdir(dst, () => {
      callback(src, dst)
    })
  }
}

moveTemplate()
