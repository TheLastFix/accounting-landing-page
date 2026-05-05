<script setup lang="ts">
interface Props {
  cols?: 2 | 3 | 4
}
withDefaults(defineProps<Props>(), {
  cols: 3,
})
</script>

<template>
  <div
    class="grid gap-6"
    :class="{
      'grid-cols-1 md:grid-cols-2': cols === 2,
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': cols === 3,
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': cols === 4,
    }"
  >
    <slot />
  </div>
</template>
