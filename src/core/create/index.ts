import { genPrompts } from './genPrompts'

export const create = async (projectName: string | null = null) => {
  const userSelectResult = await genPrompts(projectName)
  console.log(userSelectResult)
}
