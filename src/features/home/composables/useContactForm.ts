import { ref } from 'vue'

export function useContactForm() {
  const errors = ref<{ fullName?: string; email?: string; phoneNumber?: string }>({})

  const fullName = ref('')
  const email = ref('')
  const phoneCode = ref('+90')
  const phoneNumber = ref('')
  const hasReservationNote = ref(false)
  const reservationNote = ref('')
  const wantsSmsUpdates = ref(false)
  const wantsEmailUpdates = ref(false)
  const phoneCodes = ['+90', '+49', '+44']
  const isEmailFormatValid = ref(true)

  function setEmailFormatValid(value: boolean) {
    isEmailFormatValid.value = value
  }

  function validateContact(): boolean {
    const e: typeof errors.value = {}
    if (!fullName.value.trim()) e.fullName = 'Gerekli alan'
    if (!email.value.trim()) {
      e.email = 'Gerekli alan'
    } else if (!isEmailFormatValid.value) {
      e.email = 'Gecerli bir email giriniz'
    }
    if (!phoneNumber.value.trim()) e.phoneNumber = 'Gerekli alan'
    errors.value = e
    return Object.keys(e).length === 0
  }

  return {
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
  }
}
