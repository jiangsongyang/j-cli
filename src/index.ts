#!/usr/bin/env node
import cac from 'cac'
import { create } from './core'

const cli = cac('j')

cli.command('dev', 'dev').action((...args: any) => {
  console.log(args, 123)
})

cli
  .command('create [projectName]', 'create project')
  .option('-t', 'template')
  .option('--template', 'template')
  .action(create)

cli.help()

cli.parse()
