export type OptionValue = string | number | null

export type Option<Value extends OptionValue = string> = {
  value: Value
  label: string
}
