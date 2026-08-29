<script setup lang="ts">
interface Props {
  value: string;
  unit: string;
  dark?: boolean;
}
withDefaults(defineProps<Props>(), { dark: false });
</script>

<template>
  <div
    class="rounded-xl px-5 py-2 shadow-lg"
    :class="
      dark
        ? 'bg-dark/60 backdrop-blur-sm border border-white/10'
        : 'bg-white/90 backdrop-blur-sm'
    "
  >
    <span
      class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-title"
      :class="dark ? 'text-accent' : 'text-dark'"
      >{{ value }}</span
    >
    <span
      class="text-xs sm:text-sm md:text-base lg:text-lg ml-1 sm:ml-2"
      :class="dark ? 'text-white/60' : 'text-middle'"
      >{{ unit }}</span
    >
    <div class="text-center w-full mt-1">
      <span class="text-xs" :class="dark ? 'text-white/40' : 'text-middle/70'"
        >Temps de travail par mois</span
      >
    </div>
  </div>
</template>
