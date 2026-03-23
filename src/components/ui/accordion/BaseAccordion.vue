<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import type { AccordionItem } from '@/types/ui'

const props = withDefaults(
  defineProps<{
    items: AccordionItem[]
    modelValue?: string
    validateBeforeAdvance?: (itemId: string) => boolean
    completedItems?: string[]
    canOpenItem?: (itemId: string) => boolean
  }>(),
  {
    modelValue: '',
    validateBeforeAdvance: undefined,
    completedItems: () => [],
    canOpenItem: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'action', itemId: string): void
}>()

const initialId = computed(() => props.modelValue || props.items[0]?.id || '')
const activeId = ref(initialId.value)

watch(
  () => props.modelValue,
  (value) => {
    if (value) activeId.value = value
  },
)

watch(
  () => props.items,
  (items) => {
    if (!items.some((item) => item.id === activeId.value)) {
      activeId.value = items[0]?.id || ''
      emit('update:modelValue', activeId.value)
    }
  },
  { deep: true },
)

function isItemOpenAllowed(id: string) {
  const canOpen = props.canOpenItem
  if (!canOpen) return true
  return canOpen(id)
}

function openItem(id: string, force = false) {
  if (!force && !isItemOpenAllowed(id)) return
  activeId.value = id
  emit('update:modelValue', id)
}

function handleAction(itemId: string) {
  const validate = props.validateBeforeAdvance
  if (validate && !validate(itemId)) {
    return
  }

  const currentIndex = props.items.findIndex((item) => item.id === itemId)
  const nextItem = props.items[currentIndex + 1]

  if (nextItem) {
    openItem(nextItem.id, true)
  }

  emit('action', itemId)
}
</script>

<template>
  <section class="base-accordion">
    <section
      v-for="item in items"
      :key="item.id"
      class="accordion-item"
      :class="{ 'is-open': activeId === item.id }"
    >
      <button
        type="button"
        class="accordion-trigger"
        :class="{ 'is-locked': !isItemOpenAllowed(item.id) }"
        :disabled="!isItemOpenAllowed(item.id)"
        @click="openItem(item.id)"
      >
        <span class="accordion-heading">
          <span class="accordion-title">{{ item.title }}</span>
          <span v-if="activeId === item.id" class="accordion-description">{{
            item.description
          }}</span>
        </span>
        <span
          v-if="completedItems?.includes(item.id)"
          class="accordion-check-icon"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#ff6b00" />
            <path
              d="M8 12l3 3 5-6"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>

      <div v-if="activeId === item.id" class="accordion-content">
        <slot name="content" :item="item" />
        <button type="button" class="action-btn" @click="handleAction(item.id)">
          {{ item.buttonLabel }}
        </button>
      </div>
    </section>
  </section>
</template>

<style scoped>
.base-accordion {
  display: flex;
  flex-direction: column;
}

.accordion-item {
  background: #fff;
  border-bottom: 1px solid #f1ede8;
}

.accordion-trigger {
  width: 100%;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  text-align: left;
  cursor: pointer;
  padding: 0;
  height: 70px;
}

.accordion-trigger.is-locked {
  cursor: not-allowed;
  opacity: 0.7;
}

.accordion-check-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.accordion-check-icon svg {
  width: 24px;
  height: 24px;
}

.accordion-heading {
  width: 100%;
  max-width: 430px;
  min-height: 45px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}

.accordion-title {
  font-size: 16px;
  font-weight: 700;
  color: #8a846b;
  line-height: 1;
  text-align: left;
}

.accordion-item.is-open .accordion-title {
  color: #251f00;
}

.accordion-content {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
}

.accordion-description {
  margin: 0;
  width: 100%;
  max-width: 430px;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  color: #8a846b;
}

.action-btn {
  width: 100%;
  height: 50px;
  padding: 16px 24px;
  border: 0;
  border-radius: 12px;
  background: #ff6b00;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
}

@media (max-width: 768px) {
  .base-accordion {
    gap: 12px;
  }

  .accordion-item {
    border: 1px solid #f1ede8;
    border-radius: 12px;
    padding: 12px;
    background: #fff;
  }

  .accordion-item.is-open {
    border-color: #e9ddd1;
    box-shadow: 0 4px 12px rgb(15 23 42 / 0.04);
  }

  .accordion-trigger {
    align-items: center;
    gap: 8px;
    height: auto;
  }

  .accordion-title {
    font-size: 15px;
    line-height: 1.2;
  }

  .accordion-description {
    font-size: 13px;
    line-height: 1.35;
  }

  .accordion-content {
    padding: 14px 0 0;
    gap: 18px;
  }

  .accordion-check-icon {
    margin-top: 2px;
  }

  .action-btn {
    height: 48px;
    border-radius: 10px;
  }
}
</style>
