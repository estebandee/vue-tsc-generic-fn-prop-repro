**Vue - Official extension or vue-tsc version:** vue-tsc 3.3.12 (still present in 3.3.14, works in 3.3.11)

**VSCode version:** N/A (vue-tsc CLI)

**Vue version:** 3.5.42

**TypeScript version:** 6.0.3

### Steps to reproduce

A generic component with a function prop typed in terms of its type parameter:

```vue
<!-- Combo.vue -->
<script setup lang="ts" generic="Value extends OptionValue = string">
import type { Option, OptionValue } from './types'

defineProps<{
  options: Option<Value>[]
  value?: Value
  searchFunction?: (option: Option<Value>, query: string) => boolean
}>()

defineEmits<{
  select: [option: Option<Value>]
}>()
</script>
```

A generic function passed to that prop:

```ts
export const searchOption = <Value extends OptionValue>(option: Option<Value>, query: string): boolean =>
  option.label.toLowerCase().includes(query.toLowerCase())
```

```vue
<!-- App.vue -->
<template>
  <!-- OK: Value is inferred as number -->
  <Combo :options="options" :value="1" @select="onSelect" />

  <!-- Error: Value falls back to the default `string` -->
  <Combo :options="options" :value="1" :search-function="searchOption" @select="onSelect" />
</template>
```

Run `npx vue-tsc --noEmit`.

### What is expected?

`Value` is inferred as `number` from `options` and `value` in both usages, as in vue-tsc 3.3.11.

### What is actually happening?

When the generic function is passed, `Value` resolves to its default `string`:

```
src/App.vue(21,11): error TS2322: Type 'Option<number>[]' is not assignable to type 'Option<string>[]'.
  Type 'Option<number>' is not assignable to type 'Option<string>'.
    Type 'number' is not assignable to type 'string'.
src/App.vue(21,30): error TS2322: Type 'number' is not assignable to type 'string'.
src/App.vue(21,73): error TS2322: Type '(option: Option<number>) => void' is not assignable to type '(option: Option<string>) => any'.
  Types of parameters 'option' and 'option' are incompatible.
    Type 'Option<string>' is not assignable to type 'Option<number>'.
      Type 'string' is not assignable to type 'number'.
```

Removing the prop, or wrapping the function in a non-generic arrow (`(option: Option<number>, query: string) => searchOption(option, query)`), makes the errors go away.

### Link to minimal reproduction

<REPO_URL>

### Any additional comments?

Found while upgrading a large Vue 3 app from 3.3.11: every generic combobox call site that passes a shared generic search helper broke this way.
