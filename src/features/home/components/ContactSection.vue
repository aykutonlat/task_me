<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import { BaseCheckbox, BaseInput } from '@/components/ui'

defineProps<{
  errors: { fullName?: string; email?: string; phoneNumber?: string }
  phoneCodes: string[]
}>()
const emit = defineEmits<{
  (e: 'email-validity-change', value: boolean): void
}>()

const fullName = defineModel<string>('fullName', { default: '' })
const email = defineModel<string>('email', { default: '' })
const phoneCode = defineModel<string>('phoneCode', { default: '+90' })
const phoneNumber = defineModel<string>('phoneNumber', { default: '' })
const hasReservationNote = defineModel<boolean>('hasReservationNote', { default: false })
const reservationNote = defineModel<string>('reservationNote', { default: '' })
const wantsSmsUpdates = defineModel<boolean>('wantsSmsUpdates', { default: false })
const wantsEmailUpdates = defineModel<boolean>('wantsEmailUpdates', { default: false })

const phoneCodeOpen = ref(false)
const phoneCodeRef = ref<HTMLElement | null>(null)

function selectPhoneCode(code: string) {
  phoneCode.value = code
  phoneCodeOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (phoneCodeRef.value && !phoneCodeRef.value.contains(e.target as Node)) {
    phoneCodeOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="contact-form">
    <label class="contact-field">
      <span class="field-title">Fullname</span>
      <BaseInput
        v-model="fullName"
        type="text"
        placeholder="Enter fullname"
        class="field-input-base"
        :clearable="true"
        :error="errors.fullName"
      />
    </label>

    <label class="contact-field">
      <span class="field-title">E-Mail Address</span>
      <BaseInput
        v-model="email"
        type="email"
        placeholder="Enter mail"
        class="field-input-base"
        :clearable="true"
        :email-only="true"
        :error="errors.email"
        @validity-change="emit('email-validity-change', $event)"
      />
    </label>

    <div class="contact-field" :class="{ 'has-phone-error': errors.phoneNumber }">
      <span class="field-title">Phone Number</span>
      <div class="phone-row">
        <div ref="phoneCodeRef" class="phone-code-wrap">
          <button type="button" class="phone-code" @click="phoneCodeOpen = !phoneCodeOpen">
            <span>{{ phoneCode }}</span>
            <svg class="phone-code-chevron" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5.25 7.5 10 12.25 14.75 7.5" fill="none" stroke="currentColor" stroke-width="1.8" />
            </svg>
          </button>
          <ul v-if="phoneCodeOpen" class="phone-code-menu">
            <li v-for="code in phoneCodes" :key="code" class="phone-code-item" @click="selectPhoneCode(code)">
              {{ code }}
            </li>
          </ul>
        </div>
        <BaseInput
          v-model="phoneNumber"
          type="text"
          placeholder="Phone Number"
          class="phone-input-base"
          :numeric-only="true"
          :clearable="true"
        />
      </div>
      <span v-if="errors.phoneNumber" class="field-error">{{ errors.phoneNumber }}</span>
    </div>

    <BaseCheckbox v-model="hasReservationNote" label="Add reservation note" class="option-check-base" />

    <div v-if="hasReservationNote" class="contact-field">
      <span class="field-title">Reservation note</span>
      <textarea v-model="reservationNote" class="field-textarea" placeholder="Enter your note..." rows="4" />
    </div>

    <BaseCheckbox
      v-model="wantsSmsUpdates"
      label="Get text message updates about your reservation. Message charges may apply."
      class="option-check-base"
    />

    <BaseCheckbox
      v-model="wantsEmailUpdates"
      label="Get email exclusive offers, inspiration, tips and other updates from Travel - Cappadocia. You can unsubscribe at any time."
      class="option-check-base"
    />
  </div>
</template>

<style scoped>
.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact-field {
  width: 100%;
  min-height: 66px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-title {
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
  color: #251f00;
}

.field-error {
  font-size: 12px;
  color: #dc2626;
  margin-top: 2px;
}

.field-input-base {
  width: 100%;
}

.field-input-base :deep(.input-wrapper) {
  gap: 0;
}

.field-input-base :deep(.base-input) {
  width: 100%;
  height: 43px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  border: 1px solid #f1ede8;
  border-radius: 8px;
  background: #fff;
  color: #251f00;
  font-size: 14px;
  box-shadow: none;
}

.field-input-base :deep(.base-input:focus) {
  border-color: #f1ede8;
  box-shadow: none;
}

.field-input-base :deep(.base-input.has-error) {
  border-color: #dc2626;
}

.field-input-base :deep(.input-clear) {
  right: 12px;
  color: #8a846b;
  font-size: 18px;
}

.field-input-base :deep(.input-message) {
  font-size: 12px;
  color: #dc2626;
  margin-top: 2px;
}

.contact-field.has-phone-error .phone-code,
.contact-field.has-phone-error :deep(.phone-input-base .base-input) {
  border-color: #dc2626;
}

.phone-row {
  width: 100%;
  height: 43px;
  display: flex;
  position: relative;
}

.phone-code-wrap {
  position: relative;
  width: 95px;
  height: 43px;
}

.phone-code {
  width: 95px;
  height: 43px;
  box-sizing: border-box;
  border: 1px solid #f1ede8;
  border-right: 1px solid #f1ede8;
  border-radius: 8px 0 0 8px;
  padding: 0 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8a846b;
  font-size: 14px;
  cursor: pointer;
}

.phone-code:focus {
  outline: none;
}

.phone-code-chevron {
  color: #8a846b;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.phone-code-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 95px;
  margin: 0;
  padding: 4px 0;
  list-style: none;
  border: 1px solid #f1ede8;
  border-radius: 8px;
  background: #fff;
  z-index: 5;
}

.phone-code-item {
  padding: 8px 12px;
  color: #251f00;
  font-size: 14px;
  cursor: pointer;
}

.phone-code-item:hover {
  background: #f3f4f6;
}

.phone-input-base {
  flex: 1;
  min-width: 0;
}

.phone-input-base :deep(.input-wrapper) {
  gap: 0;
}

.phone-input-base :deep(.base-input) {
  height: 43px;
  box-sizing: border-box;
  border: 1px solid #f1ede8;
  border-radius: 0 8px 8px 0;
  border-left: 0;
  padding: 0 16px;
  background: #fff;
  color: #251f00;
  font-size: 14px;
  box-shadow: none;
}

.phone-input-base :deep(.base-input:focus) {
  border-color: #f1ede8;
  box-shadow: none;
}

.phone-input-base :deep(.input-clear) {
  right: 12px;
  color: #8a846b;
  font-size: 18px;
}

.field-textarea {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid #f1ede8;
  border-radius: 8px;
  background: #fff;
  color: #251f00;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
}

.field-textarea:focus {
  outline: none;
}

.option-check-base :deep(.checkbox-wrapper) {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #251f00;
  font-size: 14px;
}

.option-check-base :deep(.checkbox-indicator) {
  margin-top: 2px;
}

.option-check-base :deep(.checkbox-label) {
  color: #251f00;
  font-size: 14px;
  line-height: 1.4;
}

@media (max-width: 480px) {
  .contact-form {
    gap: 18px;
  }

  .phone-row {
    height: auto;
    flex-direction: column;
    gap: 8px;
  }

  .phone-code-wrap,
  .phone-code {
    width: 100%;
  }

  .phone-code {
    border-radius: 8px;
  }

  .phone-input-base :deep(.base-input) {
    border-left: 1px solid #f1ede8;
    border-radius: 8px;
  }
}
</style>
