import { computed, ref, watch } from 'vue'

import type { SelectOption } from '@/types/ui'

export function usePaymentForm() {
  const isPayLaterSelected = ref(true)
  const cardholderName = ref('')
  const cardNumber = ref('')
  const expMonth = ref('')
  const expYear = ref('')
  const securityCode = ref('')
  const promoCode = ref('')
  const appliedPromoCode = ref('')

  const currentYear = String(new Date().getFullYear())
  const currentMonth = new Date().getMonth() + 1

  const monthOptions = computed<SelectOption[]>(() =>
    Array.from({ length: 12 }, (_, idx) => {
      const monthNumber = idx + 1
      const value = String(monthNumber).padStart(2, '0')
      const isPastMonthInCurrentYear = expYear.value === currentYear && monthNumber < currentMonth
      return { label: value, value, disabled: isPastMonthInCurrentYear }
    }),
  )

  const yearOptions: SelectOption[] = Array.from({ length: 12 }, (_, idx) => {
    const year = String(new Date().getFullYear() + idx)
    return { label: year, value: year }
  })

  watch(expYear, (year) => {
    if (year !== currentYear) return
    const selectedMonth = Number(expMonth.value)
    if (selectedMonth && selectedMonth < currentMonth) {
      expMonth.value = ''
    }
  })

  function applyPromoCode() {
    const value = promoCode.value.trim()
    if (!value) return
    appliedPromoCode.value = value
  }

  function clearPromoCode() {
    appliedPromoCode.value = ''
  }

  return {
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
  }
}
