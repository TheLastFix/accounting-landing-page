<template>
  <div class="flex flex-col w-full">
    <div
      ref="tablistEl"
      class="flex justify-center overflow-x-auto border-b border-white mb-6 md:mb-8 relative"
      role="tablist"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :data-tab="tab.key"
        role="tab"
        :aria-selected="currentTab === tab.key"
        class="group inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 section-label text-middle transition-colors shrink-0"
        @click="currentTab = tab.key"
      >
        <span
          v-if="tab.number"
          class="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 transition-colors"
          :class="
            currentTab === tab.key
              ? 'bg-accent text-dark'
              : 'bg-middle/20 text-middle group-hover:bg-accent group-hover:text-dark'
          "
          >{{ tab.number }}</span
        >
        <span class="md:hidden">{{ tab.shortTitle || tab.title }}</span>
        <span class="hidden md:inline">{{ tab.title }}</span>
      </button>
      <span
        class="absolute bottom-0 h-0.5 bg-accent transition-all duration-300 ease"
        :style="{ left: underlineLeft + 'px', width: underlineWidth + 'px' }"
      />
    </div>

    <div class="relative w-full" style="min-height: 0">
      <transition :name="`tab-${direction}`" mode="out-in">
        <div :key="currentTab" class="w-full">
          <slot :name="`tab-${currentTab}`" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";

export interface TabItem {
  key: string;
  title: string;
  number?: number;
  shortTitle?: string;
}

interface Props {
  tabs?: TabItem[];
}

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
});

const currentTab = ref(props.tabs[0]?.key || "");
const direction = ref<"left" | "right">("right");
const tablistEl = ref<HTMLElement | null>(null);
const underlineLeft = ref(0);
const underlineWidth = ref(0);

function updateUnderline() {
  const btn = tablistEl.value?.querySelector<HTMLElement>(`[data-tab="${currentTab.value}"]`);
  if (!btn) return;
  underlineLeft.value = btn.offsetLeft;
  underlineWidth.value = btn.offsetWidth;
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  updateUnderline();
  // La police Google Fonts charge après le montage : recalcule la position quand elle est prête
  document.fonts?.ready?.then(updateUnderline);
  window.addEventListener("resize", updateUnderline);
  resizeObserver = new ResizeObserver(updateUnderline);
  if (tablistEl.value) resizeObserver.observe(tablistEl.value);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateUnderline);
  resizeObserver?.disconnect();
});

watch(currentTab, (newTab, oldTab) => {
  if (!oldTab || !newTab) return;
  const oldIndex = props.tabs.findIndex((t) => t.key === oldTab);
  const newIndex = props.tabs.findIndex((t) => t.key === newTab);
  direction.value = newIndex > oldIndex ? "right" : "left";
  nextTick(updateUnderline);
});
</script>

<style scoped>
.tab-right-enter-active,
.tab-right-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.tab-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.tab-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.tab-right-enter-to,
.tab-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.tab-left-enter-active,
.tab-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.tab-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.tab-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.tab-left-enter-to,
.tab-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
