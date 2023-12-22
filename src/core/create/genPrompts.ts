import { existsSync } from 'node:fs'
import { join } from 'node:path'
import prompts from 'prompts'
import minimist from 'minimist'
import { red, reset } from 'kolorist'
import { PWD } from '../../shared'
import { FRAMEWORKS, TEMPLATES } from './templates'

const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), { string: ['_'] })

export const genPrompts = async (cliProjectName: string | null) => {
  let result: prompts.Answers<'projectName' | 'overwrite' | 'framework'>
  const argTemplate = argv.template || argv.t

  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: cliProjectName || `please input project name`,
        },
        {
          type: (_, { projectName }: { projectName?: string }) => {
            if (!projectName) {
              throw new Error(`${red('✖')} project name is empty , operation cancelled`)
            }
            if (existsSync(join(PWD, projectName || ''))) {
              return 'select'
            }
            return null
          },
          name: 'overwrite',
          message: () => `current path is not empty. Please choose how to proceed:`,
          initial: 0,
          choices: [
            {
              title: 'Remove existing files and continue',
              value: 'yes',
            },
            {
              title: 'Cancel operation',
              value: 'no',
            },
          ],
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === 'no') {
              throw new Error(`${red('✖')} Operation cancelled`)
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(`"${argTemplate}" isn't a valid template. Please choose from below: `)
              : reset('Select a framework:'),
          initial: 0,
          choices: FRAMEWORKS.map(framework => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework,
            }
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`)
        },
      }
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return null
  }

  return result
}
