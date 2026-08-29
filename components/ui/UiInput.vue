<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    modelValue: string;
    error?: string;
    type?: "text" | "email" | "tel";
    placeholder?: string;
  }>(),
  { label: "", error: "", type: "text", placeholder: "" }
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
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      class="w-full px-4 py-3 rounded-xl text-white bg-white/5 border text-base placeholder:text-white-60 transition-colors focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      :class="error ? 'border-red-400' : 'border-white/15 hover:border-white/30'"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="block mt-1.5 text-sm text-red-400">{{ error }}</span>
  </label>
</template>
