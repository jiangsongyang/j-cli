import { cac } from 'cac'
import pkg from '../package.json'
import { genTemplate } from './node'
import type { TemplateType } from './templates'

type CreateTemplateOptions = {
  t: TemplateType
  n: string
}

const cli = cac('j-cli')

cli
  .command('[root] create', 'create template')
  .option('-t <template>', `[string] now , i support them ↓ : ` + `\n\t` + `1.rollup + ts (rt)`)
  .option('-n <projectName>', `[string] project name`)
  .action(async (root: string, options: CreateTemplateOptions) => {
    const { t, n } = options
    await genTemplate(t, n)
  })
cli.help()
cli.version(pkg.version)

cli.parse()
