<script setup lang="ts">
interface Props {
  variant?: "dark" | "light" | "accent";
  title?: string;
  subtitle?: string;
  narrow?: boolean;
  center?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
  id?: string;
}
withDefaults(defineProps<Props>(), {
  variant: "dark",
  narrow: false,
  center: false,
  fullHeight: false,
  fullWidth: false,
});
</script>

<template>
  <section
    :id="id"
    class="flex flex-col justify-center"
    :class="{
      'px-8': !fullWidth,
      'bg-dark': variant === 'dark',
      'bg-light': variant === 'light',
      'bg-accent': variant === 'accent',
      'py-24': !fullHeight,
      'min-h-[calc(100dvh-64px)]': fullHeight,
    }"
  >
    <div
      v-if="title || subtitle"
      class="mx-auto w-full px-8 mb-16"
      :class="{
        'max-w-3xl': narrow,
        'max-w-5xl': !narrow,
        'text-center': center,
      }"
    >
      <span class="section-label mb-4 block">{{ subtitle }}</span>
      <h2
        v-if="title"
        :class="{
          'section-title-light': variant === 'dark',
          'section-title-dark': variant !== 'dark',
        }"
      >
        {{ title }}
      </h2>
    </div>
    <div
      class="w-full"
      :class="{
        'mx-auto max-w-3xl': narrow,
        'mx-auto max-w-5xl': !narrow && !fullWidth,
      }"
    >
      <slot />
    </div>
  </section>
</template>
