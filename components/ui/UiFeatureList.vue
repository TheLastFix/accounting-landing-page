<script setup lang="ts">
interface Feature {
  icon: string;
  title: string;
  desc: string;
  span?: string;
  badge?: string;
}

defineProps<{
  features: Feature[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div
      v-for="f in features"
      :key="f.title"
      class="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 pr-16 hover:border-accent hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,180,0.15)] transition-all duration-300"
      :class="f.span"
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
      <span
        v-if="f.badge"
        class="absolute top-4 right-4 rounded-full border border-accent/30 bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >{{ f.badge }}</span
      >
      <div class="relative">
        <h3 class="card-title-light mb-1">{{ f.title }}</h3>
        <p
          class="body-light group-hover:text-white/55 transition-colors duration-300"
        >
          {{ f.desc }}
        </p>
      </div>
    </div>
  </div>
</template>
