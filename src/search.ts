import type { Option, OptionValue } from './types'

export const searchOption = <Value extends OptionValue>(option: Option<Value>, query: string): boolean =>
  option.label.toLowerCase().includes(query.toLowerCase())
