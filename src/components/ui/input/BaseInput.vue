<script setup lang="ts">
import { computed } from 'vue'

import type { UiSize } from '@/types/ui'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    label?: string
    placeholder?: string
    type?: string
    mask?: 'credit-card' | 'security-code'
    size?: UiSize
    disabled?: boolean
    readonly?: boolean
    clearable?: boolean
    numericOnly?: boolean
    emailOnly?: boolean
    error?: string
    helperText?: string
    fullWidth?: boolean
  }>(),
  {
    modelValue: '',
    label: '',
    placeholder: '',
    type: 'text',
    mask: undefined,
    size: 'md',
    disabled: false,
    readonly: false,
    clearable: false,
    numericOnly: false,
    emailOnly: false,
    error: '',
    helperText: '',
    fullWidth: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
  (e: 'validity-change', value: boolean): void
}>()

const classes = computed(() => [
  'base-input',
  `base-input--${props.size}`,
  {
    'has-error': Boolean(props.error),
    'is-full-width': props.fullWidth,
  },
])

const message = computed(() => props.error || props.helperText)
const hasValue = computed(() => props.modelValue !== '' && props.modelValue !== null && props.modelValue !== undefined)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (props.mask === 'credit-card') {
    const cursor = target.selectionStart ?? target.value.length
    const digitsBeforeCursor = target.value.slice(0, cursor).replace(/\D/g, '').length
    const digits = target.value.replace(/\D/g, '').slice(0, 16)

    if (!digits) {
      target.value = ''
      emit('update:modelValue', '')
      return
    }

    const padded = digits.padEnd(16, '_')
    const groups = padded.match(/.{1,4}/g) ?? []
    const masked = groups.join(' ')
    target.value = masked
    emit('update:modelValue', masked)

    const nextCursor = Math.min(
      digitsBeforeCursor + Math.floor(Math.max(0, digitsBeforeCursor - 1) / 4),
      masked.length,
    )
    requestAnimationFrame(() => target.setSelectionRange(nextCursor, nextCursor))
    return
  }

  if (props.mask === 'security-code') {
    const inputEvent = event as InputEvent
    const previousCount = String(props.modelValue ?? '')
      .replace(/\s/g, '')
      .length

    let nextCount = previousCount

    if (inputEvent.inputType?.startsWith('delete')) {
      nextCount = Math.max(0, previousCount - 1)
    } else if (inputEvent.inputType === 'insertFromPaste') {
      const pastedDigits = (target.value.match(/\d/g) ?? []).length
      nextCount = Math.min(3, previousCount + pastedDigits)
    } else if (inputEvent.inputType === 'insertText') {
      const inserted = inputEvent.data ?? ''
      if (/\d/.test(inserted)) {
        nextCount = Math.min(3, previousCount + 1)
      }
    }

    const masked = nextCount > 0 ? Array.from({ length: nextCount }, () => '*').join(' ') : ''
    target.value = masked
    emit('update:modelValue', masked)
    return
  }

  if (props.emailOnly) {
    const value = sanitizeEmailInput(target.value)
    if (value !== target.value) target.value = value
    emit('update:modelValue', value)
    emitEmailValidity(value)
    return
  }

  const value = props.numericOnly ? target.value.replace(/\D/g, '') : target.value
  if (value !== target.value) target.value = value
  emit('update:modelValue', value)
}

function clearValue(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  emit('update:modelValue', '')
  if (props.emailOnly) emit('validity-change', true)
  emit('clear')
}

function sanitizeEmailInput(value: string) {
  const withoutWhitespace = value.replace(/\s+/g, '')
  const allowedCharsOnly = Array.from(withoutWhitespace)
    .filter((char) => /[A-Za-z0-9.!#$%&'*+/=?^_`{|}~@-]/.test(char))
    .join('')

  const atIndex = allowedCharsOnly.indexOf('@')
  if (atIndex === -1) return allowedCharsOnly

  const localPartWithAt = allowedCharsOnly.slice(0, atIndex + 1)
  const domainPart = allowedCharsOnly.slice(atIndex + 1).replace(/@/g, '')
  return `${localPartWithAt}${domainPart}`
}

function emitEmailValidity(value: string) {
  if (!props.emailOnly) return
  const trimmed = value.trim()
  const isValid = trimmed === '' ? true : emailRegex.test(trimmed)
  emit('validity-change', isValid)
}
</script>

<template>
  <label class="input-wrapper">
    <span v-if="label" class="input-label">{{ label }}</span>
    <div class="input-control">
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :inputmode="emailOnly ? 'email' : numericOnly ? 'numeric' : undefined"
        :pattern="numericOnly && !emailOnly ? '[0-9]*' : undefined"
        :autocomplete="emailOnly ? 'email' : undefined"
        :autocapitalize="emailOnly ? 'none' : undefined"
        :spellcheck="emailOnly ? false : undefined"
        :class="[classes, { 'has-inline-action': clearable }]"
        @input="onInput"
      />
      <button
        v-if="clearable && hasValue && !disabled && !readonly"
        type="button"
        class="input-clear"
        aria-label="Clear input"
        @click="clearValue"
      >
        &times;
      </button>
    </div>
    <small v-if="message" :class="['input-message', { 'is-error': !!error }]">{{ message }}</small>
  </label>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.input-label {
  font-size: 0.85rem;
  color: #334155;
}

.input-control {
  position: relative;
}

.base-input {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #fff;
  color: #0f172a;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.base-input.has-inline-action {
  padding-right: 2.2rem;
}

.base-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 0.15);
}

.base-input--sm {
  padding: 0.45rem 0.65rem;
  font-size: 0.82rem;
}

.base-input--md {
  padding: 0.6rem 0.85rem;
  font-size: 0.94rem;
}

.base-input--lg {
  padding: 0.75rem 1rem;
  font-size: 1.02rem;
}

.base-input.has-error {
  border-color: #dc2626;
}

.base-input.is-full-width {
  width: 100%;
}

.input-clear {
  position: absolute;
  right: 0.65rem;
  top: 50%;
  transform: translateY(-50%);
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

.input-message {
  font-size: 0.78rem;
  color: #64748b;
}

.input-message.is-error {
  color: #dc2626;
}
</style>
