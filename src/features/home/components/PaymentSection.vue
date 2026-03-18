<script setup lang="ts">
import { BaseInput, BaseSelect } from '@/components/ui'
import type { SelectOption } from '@/types/ui'

const props = defineProps<{
  monthOptions: SelectOption[]
  yearOptions: SelectOption[]
}>()

const isPayLaterSelected = defineModel<boolean>('isPayLaterSelected', { default: true })
const cardholderName = defineModel<string>('cardholderName', { default: '' })
const cardNumber = defineModel<string>('cardNumber', { default: '' })
const expMonth = defineModel<string>('expMonth', { default: '' })
const expYear = defineModel<string>('expYear', { default: '' })
const securityCode = defineModel<string>('securityCode', { default: '' })
</script>

<template>
  <div class="payment-form">
    <h4 class="payment-section-title">Choose Payment Date</h4>

    <button
      type="button"
      :class="['pay-now-later', { 'is-active': isPayLaterSelected }]"
      @click="isPayLaterSelected = !isPayLaterSelected"
    >
      <div class="pay-later-option">
        <span class="pay-later-dot" aria-hidden="true"></span>
        <span class="pay-later-text">Book Now, Pay Later(90.00 €)</span>
      </div>
      <p class="pay-later-description">
        Book now at no extra cost and pay anytime before the start date.
      </p>
    </button>

    <section v-if="!isPayLaterSelected" class="card-details">
      <header class="card-header">
        <h4>Pay With</h4>
        <span class="secure-note">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 2.8a3.2 3.2 0 0 0-3.2 3.2v1.3H6a1.8 1.8 0 0 0-1.8 1.8v5.8A1.8 1.8 0 0 0 6 16.7h8a1.8 1.8 0 0 0 1.8-1.8V9.1A1.8 1.8 0 0 0 14 7.3h-.8V6A3.2 3.2 0 0 0 10 2.8Zm-1.8 4.5V6a1.8 1.8 0 1 1 3.6 0v1.3H8.2Z"
              fill="currentColor"
            />
          </svg>
          100% Secure Payment
        </span>
      </header>

      <div class="card-grid">
        <label class="card-field">
          <span class="card-label">Cardholder Name</span>
          <BaseInput
            v-model="cardholderName"
            type="text"
            placeholder="Enter name"
            class="field-input-base"
            :clearable="true"
          />
        </label>

        <label class="card-field">
          <span class="card-label">Credit Card Number</span>
          <BaseInput
            v-model="cardNumber"
            type="text"
            placeholder="Enter number"
            class="field-input-base"
            :numeric-only="true"
            :clearable="true"
            mask="credit-card"
          />
        </label>

        <div class="card-inline-fields">
          <label class="card-field card-field-half">
            <span class="card-label">Expiration Date</span>
            <div class="expiry-fields">
              <BaseSelect
                v-model="expMonth"
                :options="props.monthOptions"
                class="field-select-base payment-mini-select"
                placeholder="MM"
                :clearable="true"
              />
              <span class="payment-slash">/</span>
              <BaseSelect
                v-model="expYear"
                :options="props.yearOptions"
                class="field-select-base payment-mini-select"
                placeholder="YY"
                :clearable="true"
              />
            </div>
          </label>

          <label class="card-field card-field-half">
            <span class="card-label">Security Code</span>
            <BaseInput
              v-model="securityCode"
              type="text"
              placeholder="Enter code"
              class="field-input-base"
              :numeric-only="true"
              :clearable="true"
              mask="security-code"
            />
          </label>
        </div>
      </div>
    </section>

    <ul v-if="!isPayLaterSelected" class="payment-notes">
      <li>After your order is confirmed, the total amount will be charged to you.</li>
      <li>For a full refund, you must cancel at least 24 hours before the experience starts.</li>
      <li>Downtime times are based on the experience's local time.</li>
      <li>
        This experience requires good weather. If canceled due to bad weather, you will be offered a
        different date or a full refund.
      </li>
      <li>
        By clicking Complete Reservation, Travel - Cappadocia's Customer Terms Of Use, Privacy
        Policy and you also acknowledge that you have read and are bound by the tour operator's
        rules and regulations.
      </li>
    </ul>
  </div>
</template>

<style scoped>
.payment-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 18px;
}

.payment-section-title {
  margin: 0;
  color: #251f00;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
}

.pay-now-later {
  display: block;
  width: 100%;
  min-width: 100%;
  text-align: left;
  cursor: pointer;
  border: 1px solid #f1ede8;
  border-radius: 12px;
  background: #fff8f2;
  padding: 16px 20px;
}

.pay-now-later.is-active {
  width: 100%;
  min-width: 100%;
  border-color: #ff6b00;
}

.pay-later-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pay-later-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ff6b00;
  position: relative;
  flex-shrink: 0;
}

.pay-later-dot::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: #ff6b00;
  opacity: 1;
}

.pay-later-text {
  color: #ff6b00;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
}

.pay-later-description {
  margin: 8px 0 0 26px;
  color: #8a846b;
  font-size: 14px;
  line-height: 1.35;
}

.card-details {
  border-radius: 12px;
  background: #f5f6f8;
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h4 {
  margin: 0;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 1;
  letter-spacing: 0;
  color: #251f00;
}

.secure-note {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ff6b00;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0;
}

.secure-note svg {
  width: 16px;
  height: 16px;
}

.card-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-label {
  color: #251f00;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
}

.card-inline-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.expiry-fields {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
}

.payment-slash {
  color: #8a846b;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
}

.field-input-base :deep(.input-wrapper),
.field-select-base :deep(.select-wrapper) {
  gap: 0;
}

.field-input-base :deep(.input-label),
.field-select-base :deep(.select-label) {
  display: none;
}

.field-input-base :deep(.base-input),
.field-select-base :deep(.base-select) {
  width: 100%;
  height: 43px;
  border: 1px solid #f1ede8;
  border-radius: 8px;
  padding: 0 16px;
  background: #fff;
  color: #251f00;
  box-shadow: none;
}

.field-input-base :deep(.base-input:focus),
.field-select-base :deep(.base-select:focus) {
  border-color: #f1ede8;
  box-shadow: none;
}

.field-input-base :deep(.input-clear),
.field-select-base :deep(.select-clear) {
  color: #8a846b;
}

.payment-mini-select :deep(.base-select) {
  text-align: center;
  justify-content: center;
  padding: 0 30px 0 12px;
}

.payment-mini-select :deep(.select-chevron),
.payment-mini-select :deep(.select-clear) {
  right: 8px;
}

.payment-notes {
  margin: 0;
  padding-left: 18px;
  color: #251f00;
  font-size: 14px;
  line-height: 1.35;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 768px) {
  .payment-form {
    gap: 14px;
  }

  .pay-now-later {
    padding: 14px 14px 12px;
  }

  .pay-later-text {
    font-size: 15px;
  }

  .pay-later-description {
    margin-left: 26px;
    font-size: 13px;
  }

  .card-details {
    padding: 14px;
    gap: 12px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .card-inline-fields {
    grid-template-columns: 1fr;
  }

  .payment-notes {
    font-size: 13px;
    line-height: 1.4;
  }
}

@media (max-width: 480px) {
  .payment-form {
    gap: 12px;
  }

  .pay-now-later {
    padding: 12px;
    border-radius: 10px;
  }

  .pay-later-text {
    font-size: 14px;
  }

  .pay-later-description {
    margin: 8px 0 0 22px;
    font-size: 12px;
  }

  .pay-later-dot {
    width: 16px;
    height: 16px;
  }

  .card-details {
    border-radius: 10px;
    padding: 12px;
  }

  .payment-slash {
    font-size: 20px;
  }
}
</style>
