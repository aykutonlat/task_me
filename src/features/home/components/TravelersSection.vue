<script setup lang="ts">
import { BaseInput } from '@/components/ui'

defineProps<{
  errors: {
    adult1Fullname?: string
    adult2Fullname?: string
    hotelName?: string
    location?: string
  }
}>()

const adult1Fullname = defineModel<string>('adult1Fullname', { default: '' })
const adult2Fullname = defineModel<string>('adult2Fullname', { default: '' })
const hotelName = defineModel<string>('hotelName', { default: '' })
const location = defineModel<string>('location', { default: '' })
</script>

<template>
  <div class="travelers-form">
    <label class="travelers-section contact-field">
      <span class="field-title section-label">Adult Fullname 1</span>
      <BaseInput
        v-model="adult1Fullname"
        type="text"
        placeholder="Enter fullname"
        class="field-input-base"
        :clearable="true"
        :error="errors.adult1Fullname"
      />
    </label>

    <label class="travelers-section contact-field">
      <span class="field-title section-label">Adult Fullname 2</span>
      <BaseInput
        v-model="adult2Fullname"
        type="text"
        placeholder="Enter fullname"
        class="field-input-base"
        :clearable="true"
        :error="errors.adult2Fullname"
      />
    </label>

    <label class="travelers-section contact-field">
      <span class="field-title section-label">Accommodation Information</span>
      <BaseInput
        v-model="hotelName"
        type="text"
        placeholder="Hotel Name"
        class="field-input-base"
        :clearable="true"
        :error="errors.hotelName"
      />
    </label>

    <label class="travelers-section contact-field">
      <span class="field-title section-label">Pick up location</span>
      <BaseInput
        v-model="location"
        type="text"
        placeholder="Enter location"
        class="field-input-base"
        :clearable="true"
        :error="errors.location"
      />
    </label>
  </div>
</template>

<style scoped>
.travelers-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
}

.travelers-section {
  width: 100%;
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

.section-label {
  color: #251f00;
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

@media (max-width: 480px) {
  .travelers-form {
    gap: 18px;
  }
}
</style>
