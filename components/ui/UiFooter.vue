<script setup lang="ts">
const links = [
  { label: "Mentions légales", href: "#" },
  { label: "Protection des données", href: "#" },
  { label: "Contact", href: "#" },
];
</script>

<template>
  <footer class="bg-dark text-white-60 py-8 px-8">
    <div
      class="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <span class="text-sm">© 2026 OneSnap — Fabriqué en Suisse 🇨🇭</span>
      <div class="flex gap-6">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="text-sm hover:text-white transition-colors"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>
