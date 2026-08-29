<script setup lang="ts">
const links = [
  { label: "Mentions légales", to: "/mentions-legales" },
  { label: "Protection des données", to: "/protection-des-donnees" },
  { label: "Contact", to: "/contact" },
];
</script>

<template>
  <footer class="bg-dark text-white-60 py-8 px-8">
    <div
      class="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
    >
      <span class="text-sm">© 2026 OneSnap — Fait avec ❤️ en 🇨🇭</span>
      <div class="flex gap-6">
        <template v-for="link in links" :key="link.label">
          <NuxtLink
            v-if="link.to"
            :to="link.to"
            class="text-sm hover:text-white transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            class="text-sm hover:text-white transition-colors"
          >
            {{ link.label }}
          </a>
        </template>
      </div>
    </div>
  </footer>
</template>
