<template>
  <div class="flex flex-col w-full">
    <div ref="tablistEl" class="flex justify-center border-b border-white mb-8 relative" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :data-tab="tab.key"
        role="tab"
        :aria-selected="currentTab === tab.key"
        class="px-6 py-3 section-label transition-colors"
        :class="currentTab === tab.key ? 'text-middle' : 'text-middle hover:text-accent'"
        @click="currentTab = tab.key"
      >
        {{ tab.title }}
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
import { ref, watch, nextTick, onMounted } from "vue";

export interface TabItem {
  key: string;
  title: string;
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

onMounted(updateUnderline);

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
