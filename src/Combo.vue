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

<template>
  <ul>
    <li v-for="option in options" :key="String(option.value)">{{ option.label }}</li>
  </ul>
</template>
