<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title: string;
  caption: string;
  image: string;
  alt: string;
  value: string;
  unit: string;
  annotations: Array<{ x: number; y: number; text: string }>;
  dark?: boolean;
  vertical?: boolean;
  annotationsDark?: boolean;
  badgeDark?: boolean;
  textLight?: boolean;
  cardDark?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  dark: false,
  vertical: false,
});

// Les annotations peuvent garder le style sombre même si le bloc est clair
const isAnnotationsDark = computed(() => props.annotationsDark ?? props.dark);
// Idem pour le badge temps de traitement
const isBadgeDark = computed(() => props.badgeDark ?? props.dark);
// Titre + commentaire en clair (blanc) même si le bloc est clair
const isTextLight = computed(() => props.textLight ?? props.dark);

// Caption remontée uniquement pour onesnap horizontal (même div hors SVG, marge négative)
const isCaptionOverlay = computed(
  () =>
    typeof props.image === "string" &&
    props.image.includes("onesnap-flow-horizontal"),
);

// Carte sombre isolée sur fond clair continu (design "fond dominant + cartes")
const cardClass = computed(() => {
  if (!props.cardDark) return "";
  return props.vertical
    ? "bg-dark -mx-5 sm:mx-0 rounded-none sm:rounded-2xl shadow-none sm:shadow-lg px-5 py-8 sm:p-8 md:p-10"
    : "bg-dark rounded-2xl shadow-lg p-6 md:p-10";
});
</script>

<template>
  <!-- Layout vertical (mobile) : titre, badge à droite, SVG, phrases -->
  <div v-if="vertical" class="max-w-2xl mx-auto w-full">
    <div :class="cardClass">
      <h3
        class="text-left"
        :class="isTextLight ? 'sub-title-light !text-white' : 'sub-title-dark'"
      >
        {{ title }}
      </h3>
      <div class="flex justify-end mt-5">
        <UiTimeBadge :value="value" :unit="unit" :dark="isBadgeDark" />
      </div>
      <div class="relative mt-4 max-w-sm mx-auto">
        <img :src="image" :alt="alt" class="w-full h-auto" />
        <UiFlowAnnotations
          :annotations="annotations"
          :dark="isAnnotationsDark"
        />
      </div>
      <p
        class="mt-8 text-left"
        :class="
          isTextLight ? 'card-title-light !text-white' : 'card-title-dark'
        "
      >
        {{ caption }}
      </p>
      <div v-if="$slots.video" class="mt-8">
        <slot name="video" />
      </div>
    </div>
  </div>

  <!-- Layout horizontal (desktop) : titre + badge à gauche, SVG à droite -->
  <div v-else>
    <div :class="cardClass">
      <div class="flex flex-row items-start gap-8 lg:gap-12">
        <div class="shrink-0">
          <h3
            class="text-left"
            :class="
              isTextLight ? 'sub-title-light !text-white' : 'sub-title-dark'
            "
          >
            {{ title }}
          </h3>
          <div class="flex justify-start mt-5">
            <UiTimeBadge :value="value" :unit="unit" :dark="isBadgeDark" />
          </div>
        </div>
        <div class="flex-1 mt-2">
          <div class="relative">
            <img :src="image" :alt="alt" class="w-full h-auto" />
            <UiFlowAnnotations
              :annotations="annotations"
              :dark="isAnnotationsDark"
            />
          </div>
        </div>
      </div>
      <p
        class="text-left"
        :class="[
          isTextLight ? 'card-title-light !text-white' : 'card-title-dark',
          isCaptionOverlay ? '-mt-12 relative z-10' : 'mt-8',
        ]"
      >
        {{ caption }}
      </p>
      <div v-if="$slots.video" class="mt-10">
        <slot name="video" />
      </div>
    </div>
  </div>
</template>
