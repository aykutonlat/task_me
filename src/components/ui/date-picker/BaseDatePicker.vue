<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import type { UiSize } from '@/types/ui'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    min?: string
    max?: string
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
    min: '',
    max: '',
    size: 'md',
    disabled: false,
    clearable: false,
    error: '',
    helperText: '',
    fullWidth: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
}>()

type CalendarDay = {
  key: string
  date: Date
  isCurrentMonth: boolean
  isSelected: boolean
  isToday: boolean
  isDisabled: boolean
}

const rootRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const today = startOfDay(new Date())
const viewDate = ref(getInitialViewDate(props.modelValue))

const classes = computed(() => [
  'base-date-picker',
  `base-date-picker--${props.size}`,
  {
    'has-error': Boolean(props.error),
    'is-full-width': props.fullWidth,
    'is-empty': !props.modelValue,
  },
])

const message = computed(() => props.error || props.helperText)
const minDate = computed(() => parseDate(props.min))
const maxDate = computed(() => parseDate(props.max))
const selectedDate = computed(() => parseDate(props.modelValue))

const displayValue = computed(() => {
  if (!selectedDate.value) return 'Enter date'
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(selectedDate.value)
})

const monthLabel = computed(() =>
  new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(viewDate.value),
)

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const calendarDays = computed<CalendarDay[]>(() => {
  const days: CalendarDay[] = []
  const year = viewDate.value.getFullYear()
  const month = viewDate.value.getMonth()

  const firstOfMonth = new Date(year, month, 1)
  const startOffset = (firstOfMonth.getDay() + 6) % 7
  const gridStart = new Date(year, month, 1 - startOffset)

  for (let i = 0; i < 42; i += 1) {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + i)
    const normalized = startOfDay(date)
    const iso = formatDate(normalized)

    const isBeforeMin = !!minDate.value && normalized < minDate.value
    const isAfterMax = !!maxDate.value && normalized > maxDate.value

    days.push({
      key: iso,
      date: normalized,
      isCurrentMonth: normalized.getMonth() === month,
      isSelected: !!selectedDate.value && isSameDay(normalized, selectedDate.value),
      isToday: isSameDay(normalized, today),
      isDisabled: isBeforeMin || isAfterMax,
    })
  }

  return days
})

watch(
  () => props.modelValue,
  (value) => {
    const parsed = parseDate(value)
    if (parsed) {
      viewDate.value = new Date(parsed.getFullYear(), parsed.getMonth(), 1)
      isOpen.value = false
    }
  },
)

function toggleCalendar() {
  if (props.disabled) return
  if (!isOpen.value && selectedDate.value) {
    viewDate.value = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), 1)
  }
  isOpen.value = !isOpen.value
}

function moveMonth(step: number) {
  const year = viewDate.value.getFullYear()
  const month = viewDate.value.getMonth()
  viewDate.value = new Date(year, month + step, 1)
}

function selectDay(day: CalendarDay) {
  if (day.isDisabled) return
  emit('update:modelValue', formatDate(day.date))
  isOpen.value = false
}

function clearValue(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  emit('update:modelValue', '')
  emit('clear')
  isOpen.value = false
}

function onDocumentMouseDown(event: MouseEvent) {
  if (!rootRef.value) return
  if (!rootRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onDocumentMouseDown))
onUnmounted(() => document.removeEventListener('mousedown', onDocumentMouseDown))

function startOfDay(date: Date) {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseDate(value?: string) {
  if (!value) return null
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return null
  const parsed = new Date(y, m - 1, d)
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getFullYear() !== y ||
    parsed.getMonth() !== m - 1 ||
    parsed.getDate() !== d
  ) {
    return null
  }
  return startOfDay(parsed)
}

function getInitialViewDate(value?: string) {
  const parsed = parseDate(value)
  if (parsed) return new Date(parsed.getFullYear(), parsed.getMonth(), 1)
  return new Date(today.getFullYear(), today.getMonth(), 1)
}
</script>

<template>
  <div ref="rootRef" class="date-wrapper">
    <span v-if="label" class="date-label">{{ label }}</span>
    <div class="date-control">
      <button type="button" :disabled="disabled" :class="classes" @click="toggleCalendar">
        <span class="date-value" :class="{ 'is-placeholder': !modelValue }">{{ displayValue }}</span>
        <svg v-if="!(clearable && modelValue && !disabled)" class="date-icon" viewBox="0 0 20 20" aria-hidden="true">
          <rect
            x="3.5"
            y="5.5"
            width="13"
            height="11"
            rx="2.2"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          />
          <path
            d="M6.5 3.8v3.1M13.5 3.8v3.1M3.8 8.7h12.4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          />
        </svg>
      </button>
      <button
        v-if="clearable && modelValue && !disabled"
        type="button"
        class="date-clear"
        aria-label="Clear date"
        @click="clearValue"
      >
        &times;
      </button>

      <div v-if="isOpen" class="calendar-popover">
        <div class="calendar-header">
          <button type="button" class="calendar-nav" @click="moveMonth(-1)">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M12.5 5.5 8 10l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" />
            </svg>
          </button>
          <span class="calendar-month">{{ monthLabel }}</span>
          <button type="button" class="calendar-nav" @click="moveMonth(1)">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M7.5 5.5 12 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" />
            </svg>
          </button>
        </div>

        <div class="calendar-weekdays">
          <span v-for="dayName in weekDays" :key="dayName">{{ dayName }}</span>
        </div>

        <div class="calendar-grid">
          <button
            v-for="day in calendarDays"
            :key="day.key"
            type="button"
            :disabled="day.isDisabled"
            :class="[
              'calendar-day',
              {
                'is-muted': !day.isCurrentMonth,
                'is-selected': day.isSelected,
                'is-today': day.isToday,
              },
            ]"
            @mousedown.prevent.stop="selectDay(day)"
          >
            {{ day.date.getDate() }}
          </button>
        </div>
      </div>
    </div>
    <small v-if="message" :class="['date-message', { 'is-error': !!error }]">{{ message }}</small>
  </div>
</template>

<style scoped>
.date-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.date-label {
  font-size: 0.85rem;
  color: #334155;
}

.date-control {
  position: relative;
}

.base-date-picker {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #fff;
  color: #0f172a;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
  cursor: pointer;
}

.base-date-picker:focus-visible {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgb(37 99 235 / 0.15);
}

.base-date-picker:disabled {
  background: #f8fafc;
  color: #94a3b8;
  cursor: not-allowed;
}

.base-date-picker--sm {
  padding: 0.45rem 0.65rem;
  font-size: 0.82rem;
}

.base-date-picker--md {
  padding: 0.6rem 0.85rem;
  font-size: 0.94rem;
}

.base-date-picker--lg {
  padding: 0.75rem 1rem;
  font-size: 1.02rem;
}

.base-date-picker.has-error {
  border-color: #dc2626;
}

.base-date-picker.is-full-width {
  width: 100%;
}

.date-value {
  line-height: 1.2;
}

.date-value.is-placeholder {
  color: #8a846b;
}

.date-icon {
  width: 1rem;
  height: 1rem;
  color: #64748b;
  flex-shrink: 0;
}

.date-clear {
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

.calendar-popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 280px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #fff;
  box-shadow:
    0 14px 32px rgb(15 23 42 / 0.14),
    0 2px 8px rgb(15 23 42 / 0.08);
  padding: 12px;
  z-index: 20;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.calendar-month {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.calendar-nav {
  width: 28px;
  height: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #475569;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.calendar-nav svg {
  width: 14px;
  height: 14px;
}

.calendar-nav:hover {
  background: #f8fafc;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 6px;
}

.calendar-weekdays span {
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  padding: 4px 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: #fff;
  color: #1e293b;
  font-size: 13px;
  cursor: pointer;
}

.calendar-day:hover:not(:disabled) {
  background: #f1f5f9;
}

.calendar-day.is-muted {
  color: #94a3b8;
}

.calendar-day.is-today:not(.is-selected) {
  box-shadow: inset 0 0 0 1px #cbd5e1;
}

.calendar-day.is-selected {
  background: #ff6b00;
  color: #fff;
}

.calendar-day:disabled {
  color: #cbd5e1;
  cursor: not-allowed;
}

.date-message {
  font-size: 0.78rem;
  color: #64748b;
}

.date-message.is-error {
  color: #dc2626;
}
</style>
