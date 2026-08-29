<script setup lang="ts">
import { ref } from "vue";

const links = [
  { label: "Accueil", href: "#home" },
  { label: "Fonctionnement", href: "#workflow" },
  { label: "Fonctionnalités", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", to: "/contact" },
];

const menuOpen = ref(false);
</script>

<template>
  <nav
    class="sticky top-0 z-30 bg-dark/00 backdrop-blur-lg border-b border-white/10"
  >
    <div class="max-w-5xl mx-auto px-8 py-4 flex items-center gap-8">
      <NuxtLink to="/" class="mr-auto flex items-center">
        <img src="~/assets/images/logo.svg" alt="OneSnap" class="h-12" />
      </NuxtLink>
      <div class="hidden lg:flex items-center gap-6">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to || { path: '/', hash: link.href }"
          class="text-base font-semibold text-middle hover:text-accent transition-colors"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
      <UiButton
        variant="accent"
        to="/contact"
        class="hidden lg:inline-flex text-base font-semibold py-2 px-4 whitespace-nowrap"
      >
        Essayer gratuitement
      </UiButton>
      <button
        class="lg:hidden p-2 text-white hover:text-accent transition-colors"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <svg
          v-if="!menuOpen"
          class="w-7 h-7"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <svg
          v-else
          class="w-7 h-7"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="menuOpen"
      class="lg:hidden border-t border-white/10 px-8 py-4 flex flex-col gap-4"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.label"
        :to="link.to || { path: '/', hash: link.href }"
        class="text-base font-semibold text-middle hover:text-accent transition-colors"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
      <UiButton
        variant="accent"
        to="/contact"
        class="text-base font-semibold"
        @click="menuOpen = false"
      >
        Essayer gratuitement
      </UiButton>
    </div>
  </nav>
</template>
