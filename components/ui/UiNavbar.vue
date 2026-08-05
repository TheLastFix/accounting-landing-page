<script setup lang="ts">
const links = [
  { label: "Home", href: "#home" },
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "Fonctionnalités", href: "#features" },
  { label: "FAQ", href: "#faq" },
];
</script>

<template>
  <nav
    class="sticky top-0 z-30 bg-dark/40 backdrop-blur-lg border-b border-white/10"
  >
    <div class="max-w-5xl mx-auto px-8 py-4 flex items-center gap-8">
      <NuxtLink to="/" class="mr-auto flex items-center">
        <img src="/logo.svg" alt="OneSnap" class="h-12" />
      </NuxtLink>
      <div class="hidden md:flex items-center gap-6">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm text-middle hover:text-dark transition-colors"
        >
          {{ link.label }}
        </a>
      </div>
      <UiButton variant="accent" href="mailto:contact@onesnap.ch" class="text-sm py-2 px-4">
        Démo
      </UiButton>
    </div>
  </nav>
</template>
