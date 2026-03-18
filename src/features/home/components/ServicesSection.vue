<script setup lang="ts">
import { BaseDatePicker, BaseSelect } from '@/components/ui'
import type { SelectOption } from '@/types/ui'
import type { ServiceCard } from '@/features/home/types'

defineProps<{
  serviceCards: ServiceCard[]
  travelerOptions: SelectOption[]
}>()
</script>

<template>
  <div class="services-list">
    <article
      v-for="service in serviceCards"
      :key="service.id"
      :class="['service-card', { 'is-selected': !!service.date && !!service.traveler }]"
    >
      <div class="service-card-top">
        <div class="service-image-wrap">
          <img
            :src="service.imageSrc"
            :alt="service.imageAlt"
            class="service-image"
          />
          <div class="service-rating">
            <span class="rating-star" aria-hidden="true">★</span>
            <span class="rating-value">{{ service.rating }}</span>
          </div>
        </div>

        <div class="service-content">
          <h4 class="service-title">{{ service.title }}</h4>
          <p class="service-duration">{{ service.duration }}</p>

          <div class="service-badges">
            <span class="service-badge service-badge-primary">
              <span class="service-badge-icon service-badge-icon-trophy" aria-hidden="true"></span>
              {{ service.primaryBadge }}
            </span>
            <span class="service-badge service-badge-sale">
              <svg class="service-badge-icon" viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="9" fill="currentColor" />
                <path
                  d="M6 10.2 8.5 12.7 14.2 7"
                  fill="none"
                  stroke="#fff"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ service.secondaryBadge }}
            </span>
          </div>

          <div class="service-price-block">
            <p class="service-old-price">{{ service.oldPrice }}</p>
            <div class="service-price-row">
              <span class="service-price">{{ service.price }}</span>
              <span class="service-price-unit">{{ service.perPersonLabel }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="service-divider" />

      <div class="service-fields">
        <label class="service-field">
          <span class="service-label">Activity Date</span>
          <BaseDatePicker
            v-model="service.date"
            class="service-input"
            placeholder="Enter date"
            :clearable="true"
          />
        </label>

        <label class="service-field">
          <span class="service-label">Select Traveler</span>
          <BaseSelect
            v-model="service.traveler"
            :options="travelerOptions"
            class="service-input"
            placeholder="Select"
            :clearable="true"
          />
        </label>
      </div>
    </article>
  </div>
</template>

<style scoped>
.services-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}

.service-card {
  width: 100%;
  background: #fff;
  border: 1px solid #f1ede8;
  border-radius: 16px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.service-card.is-selected {
  border-color: #ff6b00;
  background: #fff8f2;
}

.service-card-top {
  display: flex;
  gap: 14px;
}

.service-image-wrap {
  position: relative;
  width: 145px;
  height: 115px;
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.service-rating {
  position: absolute;
  top: 8px;
  right: 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 999px;
  background: #fff;
}

.rating-star {
  color: #ff7a1a;
  font-size: 12px;
  line-height: 1;
}

.rating-value {
  color: #ff7a1a;
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
}

.service-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service-title {
  margin: 0;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 1;
  letter-spacing: 0;
  color: #251f00;
}

.service-duration {
  margin: 0;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0;
  color: #251f00;
}

.service-badges {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.service-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0;
  font-weight: 700;
}

.service-badge-icon {
  width: 14px;
  height: 14px;
  display: block;
}

.service-badge-icon-trophy {
  background: center / contain no-repeat url('/trophy.png');
}

.service-badge-primary {
  color: #006dff;
}

.service-badge-sale {
  color: #ff7a1a;
}

.service-price-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.service-old-price {
  margin: 0;
  color: #251f00;
  font-size: 16px;
  text-decoration: line-through;
  opacity: 0.8;
}

.service-price-row {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.service-price {
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0;
  color: #ff7a1a;
}

.service-price-unit {
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  color: #8a846b;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0;
}

.service-divider {
  width: 100%;
  height: 1px;
  background: #f1ede8;
}

.service-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  gap: 16px;
}

.service-field {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.service-label {
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0;
  color: #251f00;
}

.service-input :deep(.date-wrapper),
.service-input :deep(.select-wrapper) {
  gap: 0;
}

.service-input :deep(.date-label),
.service-input :deep(.select-label) {
  display: none;
}

.service-input :deep(.base-date-picker),
.service-input :deep(.base-select) {
  width: 100%;
  height: 43px;
  border: 1px solid #d7d1c4;
  border-radius: 8px;
  padding: 0 16px;
  font-family: Figtree, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #8a846b;
  background: #fff;
  box-shadow: none;
}

.service-input :deep(.base-date-picker:focus),
.service-input :deep(.base-select:focus) {
  border-color: #d7d1c4;
  box-shadow: none;
}


.service-input :deep(.select-chevron),
.service-input :deep(.select-clear) {
  right: 14px;
  color: #8a846b;
}

.service-input :deep(.select-clear) {
  font-size: 18px;
}

.service-input :deep(.calendar-popover),
.service-input :deep(.select-menu) {
  border: 1px solid #f1ede8;
  border-radius: 8px;
  background: #fff;
}

.service-input :deep(.select-item) {
  color: #251f00;
  background: #fff;
}

.service-input :deep(.select-item:hover) {
  background: #f3f4f6;
}

@media (max-width: 900px) {
  .service-card-top {
    flex-direction: column;
  }

  .service-image-wrap {
    width: 100%;
    height: 170px;
  }

  .service-fields {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .services-list {
    gap: 12px;
  }

  .service-card {
    border-radius: 12px;
    padding: 12px;
    gap: 10px;
  }

  .service-image-wrap {
    height: 150px;
    border-radius: 10px;
  }

  .service-content {
    gap: 6px;
  }

  .service-title {
    font-size: 13px;
    line-height: 1.25;
  }

  .service-duration {
    font-size: 11px;
  }

  .service-badge {
    font-size: 11px;
  }

  .service-old-price {
    font-size: 14px;
  }

  .service-price {
    font-size: 18px;
    line-height: 1.2;
  }

  .service-price-unit {
    font-size: 11px;
  }
}
</style>
