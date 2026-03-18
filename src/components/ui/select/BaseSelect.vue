<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { watch } from 'vue'

import type { SelectOption, UiSize } from '@/types/ui'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    options: SelectOption[]
    label?: string
    placeholder?: string
    size?: UiSize
    disabled?: boolean
    clearable?: boolean
    error?: string
    helperText?: string
    fullWidth?: boolean
  }>(),
  {
    modelValue: '',
    label: '',
    placeholder: 'Seciniz',
    size: 'md',
    disabled: false,
    clearable: false,
    error: '',
    helperText: '',
    fullWidth: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'clear'): void
}>()

const classes = computed(() => [
  'base-select',
  `base-select--${props.size}`,
  {
    'has-error': Boolean(props.error),
    'is-full-width': props.fullWidth,
  },
])

const message = computed(() => props.error || props.helperText)
const hasValue = computed(() => props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined)
const selectRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const selectedLabel = computed(() => {
  const selected = props.options.find((option) => option.value === props.modelValue)
  return selected?.label ?? props.placeholder
})

function toggleOpen() {
  if (props.disabled) return
  if (isOpen.value) {
    isOpen.value = false
    return
  }
  isOpen.value = true
}

function selectOption(value: string | number, disabled?: boolean) {
  if (disabled) return
  emit('update:modelValue', value)
  isOpen.value = false
}

function clearValue(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  emit('update:modelValue', '')
  emit('clear')
  isOpen.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (!selectRef.value) return
  if (!selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))

watch(
  () => props.modelValue,
  () => {
    isOpen.value = false
  },
)
</script>

<template>
  <label class="select-wrapper">
    <span v-if="label" class="select-label">{{ label }}</span>
    <div ref="selectRef" class="select-control">
      <button
        type="button"
        :disabled="disabled"
        :class="classes"
        @click="toggleOpen"
      >
        <span :class="['select-value', { 'is-placeholder': !hasValue }]">{{ selectedLabel }}</span>
      </button>
      <button
        v-if="clearable && hasValue && !disabled"
        type="button"
        class="select-clear"
        aria-label="Clear selection"
        @click="clearValue"
      >
        &times;
      </button>
      <svg v-else class="select-chevron" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M5.25 7.5 10 12.25 14.75 7.5" fill="none" stroke="currentColor" stroke-width="1.8" />
      </svg>
      <ul v-if="isOpen" class="select-menu">
        <li
          v-for="option in options"
          :key="option.value"
          :class="['select-item', { 'is-disabled': option.disabled }]"
          @mousedown.prevent="selectOption(option.value, option.disabled)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
    <small v-if="message" :class="['select-message', { 'is-error': !!error }]">{{ message }}</small>
  </label>
</template>

<style scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.select-label {
  font-size: 0.85rem;
  color: #334155;
}

.select-control {
  position: relative;
}

.base-select {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #fff;
  color: #0f172a;
  text-align: left;
  cursor: pointer;
  padding-right: 2.2rem;
}

.base-select:focus-visible {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 0.15);
}

.base-select--sm {
  padding: 0.45rem 0.65rem;
  font-size: 0.82rem;
}

.base-select--md {
  padding: 0.6rem 0.85rem;
  font-size: 0.94rem;
}

.base-select--lg {
  padding: 0.75rem 1rem;
  font-size: 1.02rem;
}

.base-select.has-error {
  border-color: #dc2626;
}

.base-select.is-full-width {
  width: 100%;
}

.select-value.is-placeholder {
  color: #8a846b;
}

.select-menu {
  position: absolute;
  top: auto;
  bottom: calc(100% + 4px);
  left: 0;
  width: 100%;
  margin: 0;
  padding: 4px 0;
  list-style: none;
  border: 1px solid #f1ede8;
  border-radius: 8px;
  background: #fff;
  z-index: 10;
}

.select-item {
  padding: 8px 12px;
  color: #251f00;
  font-size: 14px;
  cursor: pointer;
}

.select-item:hover {
  background: #f3f4f6;
}

.select-item.is-disabled {
  color: #94a3b8;
  cursor: not-allowed;
  background: #fff;
}

.select-chevron,
.select-clear {
  position: absolute;
  right: 0.65rem;
  top: 50%;
  transform: translateY(-50%);
}

.select-chevron {
  width: 1rem;
  height: 1rem;
  color: #64748b;
  pointer-events: none;
}

.select-clear {
  width: 1.1rem;
  height: 1.1rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #64748b;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.select-message {
  font-size: 0.78rem;
  color: #64748b;
}

.select-message.is-error {
  color: #dc2626;
}
</style>
