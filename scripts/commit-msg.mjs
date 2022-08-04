// Invoked on the commit-msg git hook by yorkie.

import { readFileSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'

const msg = readFileSync(join(process.cwd(), '.git/COMMIT_EDITMSG'), 'utf-8').trim()

const commitRE
  = /^\[(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)\] : .{1,200}/

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red('invalid commit message format.')}\n\n${
      chalk.red(
        '  Proper commit message format is required for automated changelog generation. Examples:\n\n',
      )}`,
  )
  process.exit(1)
}
