<script setup lang="ts">
interface Props {
  name: string;
  price: string;
  period?: string;
  tagline?: string;
  features: string[];
  ctaLabel: string;
  ctaHref?: string;
  note?: string;
  highlighted?: boolean;
}
withDefaults(defineProps<Props>(), {
  period: "/ mois",
  tagline: "",
  ctaHref: "#",
  note: "",
  highlighted: false,
});
</script>

<template>
  <div
    class="rounded-2xl p-10 text-center max-w-md mx-auto"
    :class="
      highlighted
        ? 'bg-accent text-dark ring-2 ring-accent/50 scale-105'
        : 'bg-white border-2 border-accent'
    "
  >
    <div class="mb-2">
      <span class="card-title-dark">{{ name }}</span>
    </div>
    <div class="mb-2">
      <span class="display text-dark">{{ price }}</span>
      <span class="text-middle">{{ period }}</span>
    </div>
    <p v-if="tagline" class="text-middle mb-8">{{ tagline }}</p>

    <ul class="text-left mb-8 space-y-3">
      <li
        v-for="feature in features"
        :key="feature"
        class="flex items-center gap-2 body-dark"
      >
        <span class="text-accent text-xl leading-none">·</span>
        {{ feature }}
      </li>
    </ul>

    <UiButton variant="primary" :href="ctaHref" class="w-full">
      {{ ctaLabel }}
    </UiButton>

    <p v-if="note" class="mt-4 text-xs text-middle">{{ note }}</p>
  </div>
</template>
