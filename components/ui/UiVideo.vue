<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, useAttrs } from "vue";

interface Props {
  webmSrc: string;
  mp4Src: string;
  posterSrc: string;
  altText?: string;
  maxWidth?: string;
  aspectRatio?: string;
}

const props = withDefaults(defineProps<Props>(), {
  altText: "Video preview",
  maxWidth: "100%", // Takes full parent width by default
  aspectRatio: "16 / 9",
});

// Access attributes passed to component (like class, id, style)
const attrs = useAttrs();

const videoContainer = ref<HTMLElement | null>(null);
const isVisible = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  // Trigger loading 200px before video enters viewport
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        isVisible.value = true;
        if (videoContainer.value && observer) {
          observer.unobserve(videoContainer.value);
        }
      }
    },
    { rootMargin: "200px" },
  );

  if (videoContainer.value) {
    observer.observe(videoContainer.value);
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div
    ref="videoContainer"
    :class="['video-wrapper', attrs.class]"
    :style="{ maxWidth: props.maxWidth, aspectRatio: props.aspectRatio }"
  >
    <!-- Render video element only when scrolled near -->
    <video
      v-if="isVisible"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      :poster="props.posterSrc"
      class="dashboard-video"
    >
      <source :src="props.webmSrc" type="video/webm" />
      <source :src="props.mp4Src" type="video/mp4" />
    </video>

    <!-- Placeholder frame shown before scrolling into view -->
    <img
      v-else
      :src="props.posterSrc"
      :alt="props.altText"
      class="dashboard-poster"
    />
  </div>
</template>

<style scoped>
.video-wrapper {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  overflow: hidden;
  background-color: #0f172a;
}

.dashboard-video,
.dashboard-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
