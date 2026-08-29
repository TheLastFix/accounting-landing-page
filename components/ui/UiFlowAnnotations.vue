<script setup lang="ts">
interface Props {
  annotations: Array<{ x: number; y: number; text: string }>;
  dark?: boolean;
}
withDefaults(defineProps<Props>(), { dark: false });
</script>

<template>
  <div class="absolute inset-0 pointer-events-none">
    <span
      v-for="(ann, i) in annotations"
      :key="i"
      class="absolute flex items-start gap-1.5 whitespace-pre-line leading-snug rounded-lg px-3 py-1.5"
      :class="
        dark
          ? 'bg-dark/60 backdrop-blur-sm border border-white/15 shadow-sm'
          : 'bg-white/85 backdrop-blur-sm border border-dark/10 shadow-sm'
      "
      :style="{
        left: ann.x + '%',
        top: ann.y + '%',
        transform: 'translateY(-50%)',
      }"
    >
      <span
        class="h-5 w-5 shrink-0 rounded-full bg-accent text-dark text-xs font-bold flex items-center justify-center"
        >{{ String(i + 1).padStart(2, "0") }}</span
      >
      <span class="text-sm font-medium" :class="dark ? 'text-light/90' : 'text-dark/90'">{{
        ann.text
      }}</span>
    </span>
  </div>
</template>
