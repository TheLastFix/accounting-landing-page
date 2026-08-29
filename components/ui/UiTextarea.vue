<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    modelValue: string;
    error?: string;
    placeholder?: string;
    rows?: number;
  }>(),
  { label: "", error: "", placeholder: "", rows: 6 }
);

defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <label class="block text-left">
    <span
      v-if="label"
      class="block mb-2 text-sm font-semibold text-white/80"
      >{{ label }}</span
    >
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :aria-invalid="!!error"
      class="w-full px-4 py-3 rounded-xl text-white bg-white/5 border text-base placeholder:text-white-60 transition-colors resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      :class="error ? 'border-red-400' : 'border-white/15 hover:border-white/30'"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    <span v-if="error" class="block mt-1.5 text-sm text-red-400">{{ error }}</span>
  </label>
</template>
