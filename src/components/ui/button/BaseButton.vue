<script setup lang="ts">
import { computed } from 'vue'

import type { UiSize } from '@/types/ui'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'

const props = withDefaults(
  defineProps<{
    label?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: ButtonVariant
    size?: UiSize
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
    rounded?: boolean
  }>(),
  {
    label: 'Button',
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    rounded: false,
  },
)

const classes = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'is-loading': props.loading,
    'is-full-width': props.fullWidth,
    'is-rounded': props.rounded,
  },
])
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="classes">
    <slot>{{ loading ? 'Loading...' : label }}</slot>
  </button>
</template>

<style scoped>
.base-button {
  border: 1px solid transparent;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.base-button--sm {
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
}

.base-button--md {
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
}

.base-button--lg {
  padding: 0.8rem 1.3rem;
  font-size: 1.05rem;
}

.base-button--primary {
  background: #2563eb;
  color: #fff;
}

.base-button--secondary {
  background: #4b5563;
  color: #fff;
}

.base-button--outline {
  background: transparent;
  border-color: #cbd5e1;
  color: #1e293b;
}

.base-button--danger {
  background: #dc2626;
  color: #fff;
}

.base-button--ghost {
  background: transparent;
  color: #2563eb;
}

.base-button.is-full-width {
  width: 100%;
}

.base-button.is-rounded {
  border-radius: 999px;
}

.base-button:not(.is-rounded) {
  border-radius: 10px;
}
</style>
