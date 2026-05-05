<script setup lang="ts">
const open = ref(false);
</script>

<template>
  <details
    class="bg-white rounded-lg border border-light overflow-hidden"
    :open="open"
    @toggle="open = !open"
  >
    <summary
      class="flex justify-between items-center p-5 cursor-pointer list-none card-title-dark"
    >
      <slot name="question" />
      <span class="text-2xl text-accent shrink-0 ml-4">{{
        open ? "−" : "+"
      }}</span>
    </summary>
    <div class="px-5 pb-5 body-dark">
      <slot name="answer" />
    </div>
  </details>
</template>
