<script setup lang="ts">
interface Props {
  variant?: "accent" | "subtle";
}
withDefaults(defineProps<Props>(), {
  variant: "subtle",
});
</script>

<template>
  <span
    class="inline-block text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full"
    :class="{
      'bg-accent-bg text-accent-dark': variant === 'accent',
      'bg-dark/10 text-middle': variant === 'subtle',
    }"
  >
    <slot />
  </span>
</template>
