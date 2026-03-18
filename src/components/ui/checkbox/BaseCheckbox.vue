<script setup lang="ts">
import type { UiSize } from '@/types/ui'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    label?: string
    description?: string
    disabled?: boolean
    size?: UiSize
  }>(),
  {
    modelValue: false,
    label: '',
    description: '',
    disabled: false,
    size: 'md',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <label :class="['checkbox-wrapper', `checkbox-wrapper--${size}`, { 'is-disabled': disabled }]">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="checkbox-indicator" aria-hidden="true">
      <svg viewBox="0 0 16 16">
        <path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
    </span>
    <span class="checkbox-content">
      <span v-if="label" class="checkbox-label">{{ label }}</span>
      <small v-if="description" class="checkbox-description">{{ description }}</small>
    </span>
  </label>
</template>

<style scoped>
.checkbox-wrapper {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.55rem;
  cursor: pointer;
  position: relative;
}

.checkbox-wrapper input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-indicator {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  flex-shrink: 0;
  border: 1px solid #d7d1c4;
  border-radius: 4px;
  background: #fff;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.checkbox-indicator svg {
  width: 12px;
  height: 12px;
  opacity: 0;
}

.checkbox-wrapper input:checked + .checkbox-indicator {
  background: #ff6b00;
  border-color: #ff6b00;
}

.checkbox-wrapper input:checked + .checkbox-indicator svg {
  opacity: 1;
}

.checkbox-wrapper--sm .checkbox-indicator {
  width: 14px;
  height: 14px;
}

.checkbox-wrapper--sm .checkbox-indicator svg {
  width: 10px;
  height: 10px;
}

.checkbox-wrapper--lg .checkbox-indicator {
  width: 18px;
  height: 18px;
}

.checkbox-wrapper--lg .checkbox-indicator svg {
  width: 13px;
  height: 13px;
}

.checkbox-content {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.checkbox-label {
  font-size: 0.92rem;
  color: #0f172a;
}

.checkbox-description {
  color: #64748b;
  font-size: 0.76rem;
}

.checkbox-wrapper.is-disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
