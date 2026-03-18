<script setup lang="ts">
import { BaseButton } from '@/components/ui'

defineProps<{
  promoCode: string
  appliedPromoCode: string
}>()

const emit = defineEmits<{
  (e: 'update:promoCode', value: string): void
  (e: 'applyPromo'): void
  (e: 'clearPromo'): void
}>()
</script>

<template>
  <aside class="info-panel">
    <section class="booking-summary">
      <div class="summary-head">
        <img src="/602--kayapalazzo.png" alt="Tour" class="summary-image" />
        <h3 class="summary-title">
          Kapadokya | Persembe Istanbul Hareketli | 2 Gece Konaklama 3 Gece 4 Gün
        </h3>
      </div>

      <div class="summary-meta">
        <p>10 Mayis 2022</p>
        <p>Haziran'a Özel Fiyatlar 12:00</p>
        <p>2 Yetiskin, 1 Çocuk, 1 Bebek</p>
      </div>

      <div class="summary-notes">
        <p class="note-item">
          <span class="note-icon note-icon-union" aria-hidden="true"></span>
          Free cancellation before 12:00 AM on May 9th.
        </p>
        <p class="note-item is-alert">
          <span class="note-icon note-icon-alert" aria-hidden="true"></span>
          It's sold out, hurry up!
        </p>
      </div>

      <div v-if="!appliedPromoCode" class="promo-row">
        <input
          :value="promoCode"
          type="text"
          placeholder="Enter Promo Code"
          class="promo-input"
          @input="emit('update:promoCode', ($event.target as HTMLInputElement).value)"
        />
        <button type="button" class="promo-apply" @click="emit('applyPromo')">Apply</button>
      </div>
      <button v-else type="button" class="promo-applied" @click="emit('clearPromo')">
        <span>{{ appliedPromoCode }}</span>
        <span class="promo-cancel-icon" aria-hidden="true"></span>
      </button>

      <div class="price-list">
        <div class="price-row">
          <span>3 misafir</span>
          <strong>499 ₺</strong>
        </div>
        <div class="price-row">
          <span>Vergi bedeli</span>
          <strong>499 ₺</strong>
        </div>
        <div class="price-row">
          <span>Discount</span>
          <strong class="is-discount">499 ₺</strong>
        </div>
      </div>

      <div class="total-row">
        <span>Total</span>
        <strong>15,499 ₺</strong>
      </div>

      <BaseButton type="button" variant="ghost" class="whatsapp-btn">
        <span class="whatsapp-icon" aria-hidden="true"></span>
        Contact us on Whatsapp
        <span class="whatsapp-icon-right" aria-hidden="true"></span>
      </BaseButton>
    </section>

    <section class="why-book">
      <h4>Why book with us?</h4>
      <ul>
        <li>
          <span class="why-icon why-icon-history" aria-hidden="true"></span>
          <span class="why-title">Free Cancellation & Refund</span>
          <span class="why-desc"
            >The tour can be canceled up to 24 hours before the start time.</span
          >
        </li>
        <li>
          <span class="why-icon why-icon-confirmation" aria-hidden="true"></span>
          <span class="why-title">Flexible Ticket</span>
          <span class="why-desc"
            >Transferring your ticket to a different date is easy with a flexible ticket.</span
          >
        </li>
        <li>
          <span class="why-icon why-icon-support" aria-hidden="true"></span>
          <span class="why-title">24/7 Customer Service</span>
        </li>
        <li>
          <span class="why-icon why-icon-payments" aria-hidden="true"></span>
          <span class="why-title">No Hidden Fees</span>
        </li>
      </ul>
    </section>
  </aside>
</template>

<style scoped>
.booking-summary {
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: #251f00;
}

.summary-head {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 10px;
  align-items: center;
}

.summary-image {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
}

.summary-title {
  margin: 0;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  color: #251f00;
}

.summary-meta p {
  margin: 0;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  color: #251f00;
}

.summary-meta {
  width: 100%;
  height: 58px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 1;
}

.summary-notes {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.note-item {
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 13px;
  line-height: 1.35;
}

.note-item.is-alert {
  color: #1f6fff;
}

.note-icon.note-icon-alert {
  border: 0;
  border-radius: 0;
  background: url('/Group 2015.svg') center / contain no-repeat;
  font-size: 0;
}

.note-icon.note-icon-union {
  border: 0;
  border-radius: 0;
  background: url('/Union.svg') center / contain no-repeat;
  font-size: 0;
}

.note-icon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid currentColor;
  border-radius: 50%;
  font-size: 11px;
  line-height: 1;
  margin-top: 1px;
}

.promo-row {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  border: 1px solid #ede6de;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}

.promo-input {
  height: 40px;
  border: 0;
  padding: 0 12px;
  background: transparent;
  font-size: 14px;
}

.promo-input:focus {
  outline: none;
}

.promo-apply {
  border: 0;
  background: transparent;
  color: #251f00;
  font-weight: 700;
  padding: 0 12px;
  height: 40px;
  cursor: pointer;
}

.promo-applied {
  width: 120px;
  height: 44px;
  padding: 13px 10px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: 8px;
  border: 1px solid #ff6b00;
  background: #fff8e9;
  color: #251f00;
  font-size: 12px;
  cursor: pointer;
}

.promo-cancel-icon {
  width: 16px;
  height: 16px;
  background: url('/cancel.svg') center / contain no-repeat;
  flex-shrink: 0;
}

.price-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9e1d9;
}

.price-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 1.2;
}

.price-row strong {
  font-size: 14px;
}

.price-row .is-discount {
  color: #ff7a1a;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-row span,
.total-row strong {
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0;
  color: #251f00;
}

.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  border: 0;
  border-radius: 8px;
  background: #22c55e;
  color: #fff;
  height: 30px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.whatsapp-icon {
  width: 14px;
  height: 14px;
  background: url('/Group.svg') center / contain no-repeat;
  flex-shrink: 0;
}

.whatsapp-icon-right {
  width: 12px;
  height: 12px;
  background: url('/Union (2).svg') center / contain no-repeat;
  flex-shrink: 0;
}

.why-book {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.why-book h4 {
  margin: 0;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0;
  color: #251f00;
}

.why-book ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.why-book li {
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 8px;
  align-items: center;
  gap: 6px;
  color: #251f00;
}

.why-title {
  grid-column: 2;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
}

.why-desc {
  grid-column: 2;
  font-size: 12px;
  line-height: 1.35;
  color: #8a846b;
}

.why-icon {
  width: 20px;
  height: 20px;
  margin-top: 1px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.why-icon-payments {
  background-image: url('/payments.svg');
}

.why-icon-support {
  background-image: url('/support.svg');
}

.why-icon-confirmation {
  background-image: url('/confirmation_number.svg');
}

.why-icon-history {
  background-image: url('/history.svg');
}

.info-panel {
  flex: 1;
  min-height: 0;
  padding: 40px 260px 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: #faf6f2;
  overflow-y: auto;
}

@media (max-width: 1280px) {
  .info-panel {
    padding: 28px 24px;
  }
}

@media (max-width: 1024px) {
  .info-panel {
    width: 100%;
    min-height: auto;
    padding: 20px 16px 24px;
    overflow: visible;
  }

  .booking-summary,
  .why-book {
    background: #fff;
    border: 1px solid #f1ede8;
    border-radius: 12px;
    padding: 14px;
  }

  .summary-title {
    font-size: 14px;
    line-height: 1.25;
  }

  .price-row {
    font-size: 13px;
  }

  .total-row span,
  .total-row strong {
    font-size: 18px;
  }

  .whatsapp-btn {
    width: 100%;
    justify-content: center;
    align-self: stretch;
    height: 38px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .info-panel {
    padding: 14px 12px 18px;
    gap: 14px;
  }

  .booking-summary,
  .why-book {
    padding: 12px;
  }

  .summary-head {
    grid-template-columns: 50px 1fr;
    gap: 8px;
  }

  .summary-image {
    width: 50px;
    height: 50px;
  }
}
</style>
