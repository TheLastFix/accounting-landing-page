<script setup lang="ts">
interface Feature {
  icon: string;
  title: string;
  desc: string;
}

defineProps<{
  features: Feature[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="f in features"
      :key="f.title"
      class="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 hover:border-accent/25 hover:bg-white/[0.04] transition-all duration-300"
    >
      <svg
        class="pointer-events-none absolute -top-4 -right-4 w-32 h-32 text-white/[0.08] group-hover:text-white/[0.2] group-hover:-top-2 group-hover:-right-2 transition-all duration-500"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" :d="f.icon" />
      </svg>
      <div class="relative">
        <h3 class="card-title-light mb-1">{{ f.title }}</h3>
        <p
          class="body-dark group-hover:text-white/55 transition-colors duration-300"
        >
          {{ f.desc }}
        </p>
      </div>
    </div>
  </div>
</template>
