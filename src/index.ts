import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import cac from 'cac'
import { create } from './core'
import { __dirname } from './shared'

const pgk = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

const cli = cac('j')

cli.command('dev', 'dev').action((...args: any) => {
  console.log(args, 123)
})

cli
  .command('create [projectName]', 'create project')
  .option('-t', 'template')
  .option('--template', 'template')
  .action(create)

cli.version(pgk.version)

cli.help()

cli.parse()
