<script setup lang="ts">
interface Props {
  variant?: "dark" | "light" | "middle" | "transparent";
  align?: "left" | "center" | "right";
  hover?: boolean;
}
withDefaults(defineProps<Props>(), {
  variant: "dark",
  align: "center",
  hover: true,
});
</script>

<template>
  <div
    class="group rounded-2xl p-8 transition-all duration-300 ease-out"
    :class="[
      variant === 'dark' ? 'bg-dark border border-white/10' : '',
      variant === 'light' ? 'bg-white border border-subtle' : '',
      variant === 'middle' ? 'bg-middle' : '',
      variant === 'transparent' ? 'bg-transparent' : '',
      align === 'center' ? 'text-center' : '',
      align === 'left' ? 'text-left' : '',
      align === 'right' ? 'text-right' : '',
      hover
        ? 'hover:shadow-xl hover:-translate-y-1 hover:border-accent/30'
        : '',
    ]"
  >
    <slot />
  </div>
</template>
