<script setup lang="ts">
import { NuxtLink } from '#components';

interface Props {
  variant?: 'primary' | 'accent' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const tag = computed(() => props.href ? 'a' : props.to ? NuxtLink : 'button')

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-sm px-4 py-2'
    case 'lg': return 'text-base px-6 py-3 md:text-lg md:px-10 md:py-4'
    default: return 'text-base px-8 py-3'
  }
})
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    class="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.98]"
    :class="[
      sizeClasses,
      {
        'bg-dark text-white': variant === 'primary',
        'bg-accent text-dark': variant === 'accent',
        'border-2 border-dark text-dark hover:bg-dark hover:text-white': variant === 'outline',
      }
    ]"
  >
    <slot />
  </component>
</template>
