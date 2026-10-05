<script setup lang="ts">
interface Props {
  variant?: "dark" | "light" | "accent" | "middle";
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
      'px-5 sm:px-8': !fullWidth,
      'py-12 md:py-0': fullHeight,
      'bg-dark': variant === 'dark',
      'bg-light': variant === 'light',
      'bg-accent': variant === 'accent',
      'bg-middle-light': variant === 'middle',
      'py-[var(--section-padding-y)]': !fullHeight,
      'min-h-[calc(100dvh-64px)]': fullHeight,
    }"
  >
    <div
      v-if="title || subtitle"
      class="mx-auto w-full mb-8 md:mb-16"
      :class="{
        'max-w-3xl': narrow,
        'max-w-6xl': !narrow,
        'text-center': center,
      }"
    >
      <span class="section-label mb-2 md:mb-4 block">{{ subtitle }}</span>
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
        'mx-auto max-w-6xl': !narrow && !fullWidth,
      }"
    >
      <slot />
    </div>
  </section>
</template>
