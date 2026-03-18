<script setup lang="ts">
import { ref } from 'vue'

import { BaseAccordion } from '@/components/ui'
import { useContactForm } from '@/features/home/composables/useContactForm'
import ContactSection from '@/features/home/components/ContactSection.vue'
import TravelersSection from '@/features/home/components/TravelersSection.vue'
import ServicesSection from '@/features/home/components/ServicesSection.vue'
import PaymentSection from '@/features/home/components/PaymentSection.vue'
import BookingSummaryPanel from '@/features/home/components/BookingSummaryPanel.vue'
import { createInitialServiceCards, TRAVELER_OPTIONS } from '@/features/home/constants'
import { usePaymentForm } from '@/features/home/composables/usePaymentForm'
import { useStepFlow } from '@/features/home/composables/useStepFlow'
import { useTravelersForm } from '@/features/home/composables/useTravelersForm'
import { useReservationStore } from '@/stores/reservation'
import type { ServiceCard } from '@/features/home/types'

const reservationStore = useReservationStore()
const { activeSection, sections, completedItems, canOpenSection, onAccordionAction } =
  useStepFlow(reservationStore)

const {
  errors,
  fullName,
  email,
  phoneCode,
  phoneNumber,
  hasReservationNote,
  reservationNote,
  wantsSmsUpdates,
  wantsEmailUpdates,
  phoneCodes,
  setEmailFormatValid,
  validateContact,
} = useContactForm()

const { travelersErrors, adult1Fullname, adult2Fullname, hotelName, location, validateTravelers } =
  useTravelersForm()

const {
  isPayLaterSelected,
  cardholderName,
  cardNumber,
  expMonth,
  expYear,
  securityCode,
  promoCode,
  appliedPromoCode,
  monthOptions,
  yearOptions,
  applyPromoCode,
  clearPromoCode,
} = usePaymentForm()

const travelerOptions = TRAVELER_OPTIONS
const serviceCards = ref<ServiceCard[]>(createInitialServiceCards())

function validateBeforeAdvance(itemId: string): boolean {
  if (itemId === 'contact') return validateContact()
  if (itemId === 'travelers') return validateTravelers()
  return true
}
</script>

<template>
  <section class="home-view">
    <aside class="actions-panel">
      <BaseAccordion
        v-model="activeSection"
        :items="sections"
        :completed-items="completedItems"
        :validate-before-advance="validateBeforeAdvance"
        :can-open-item="canOpenSection"
        @action="onAccordionAction"
      >
        <template #content="{ item }">
          <ContactSection
            v-if="item.id === 'contact'"
            v-model:full-name="fullName"
            v-model:email="email"
            v-model:phone-code="phoneCode"
            v-model:phone-number="phoneNumber"
            v-model:has-reservation-note="hasReservationNote"
            v-model:reservation-note="reservationNote"
            v-model:wants-sms-updates="wantsSmsUpdates"
            v-model:wants-email-updates="wantsEmailUpdates"
            :errors="errors"
            :phone-codes="phoneCodes"
            @email-validity-change="setEmailFormatValid"
          />

          <TravelersSection
            v-if="item.id === 'travelers'"
            v-model:adult1-fullname="adult1Fullname"
            v-model:adult2-fullname="adult2Fullname"
            v-model:hotel-name="hotelName"
            v-model:location="location"
            :errors="travelersErrors"
          />

          <ServicesSection
            v-if="item.id === 'services'"
            :service-cards="serviceCards"
            :traveler-options="travelerOptions"
          />

          <PaymentSection
            v-if="item.id === 'payment'"
            v-model:is-pay-later-selected="isPayLaterSelected"
            v-model:cardholder-name="cardholderName"
            v-model:card-number="cardNumber"
            v-model:exp-month="expMonth"
            v-model:exp-year="expYear"
            v-model:security-code="securityCode"
            :month-options="monthOptions"
            :year-options="yearOptions"
          />
        </template>
      </BaseAccordion>
    </aside>
    <BookingSummaryPanel
      :promo-code="promoCode"
      :applied-promo-code="appliedPromoCode"
      @update:promo-code="promoCode = $event"
      @apply-promo="applyPromoCode"
      @clear-promo="clearPromoCode"
    />
  </section>
</template>

<style scoped>
.home-view {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
}

.actions-panel {
  flex: 1;
  min-height: 0;
  padding: 40px 30px 40px 260px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: #fff;
  box-shadow: inset -1px 0 0 #f1ede8;
  overflow-y: auto;
  overscroll-behavior: contain;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.actions-panel::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

@media (max-width: 1280px) {
  .actions-panel {
    padding: 28px 20px 28px 24px;
  }
}

@media (max-width: 1024px) {
  .home-view {
    flex-direction: column;
    height: auto;
    min-height: auto;
    background: #faf6f2;
  }

  :deep(.info-panel) {
    order: 1;
  }

  .actions-panel {
    order: 2;
    width: 100%;
    padding: 20px 16px;
    box-shadow: none;
    background: transparent;
    overflow: visible;
  }
}
</style>
