<script setup lang="ts">
import Combo from './Combo.vue'
import { searchOption } from './search'
import type { Option } from './types'

const options: Option<number>[] = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
]

function onSelect(option: Option<number>) {
  console.log(option.value)
}
</script>

<template>
  <!-- OK: Value is inferred as number -->
  <Combo :options="options" :value="1" @select="onSelect" />

  <!-- 3.3.12+: Value falls back to the default `string` once a generic function is passed -->
  <Combo :options="options" :value="1" :search-function="searchOption" @select="onSelect" />
</template>
