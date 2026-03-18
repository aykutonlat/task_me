import { ref } from 'vue'

export function useTravelersForm() {
  const travelersErrors = ref<{
    adult1Fullname?: string
    adult2Fullname?: string
    hotelName?: string
    location?: string
  }>({})

  const adult1Fullname = ref('')
  const adult2Fullname = ref('')
  const hotelName = ref('')
  const location = ref('')

  function validateTravelers(): boolean {
    const e: typeof travelersErrors.value = {}
    if (!adult1Fullname.value.trim()) e.adult1Fullname = 'Gerekli alan'
    if (!adult2Fullname.value.trim()) e.adult2Fullname = 'Gerekli alan'
    if (!hotelName.value.trim()) e.hotelName = 'Gerekli alan'
    if (!location.value.trim()) e.location = 'Gerekli alan'
    travelersErrors.value = e
    return Object.keys(e).length === 0
  }

  return {
    travelersErrors,
    adult1Fullname,
    adult2Fullname,
    hotelName,
    location,
    validateTravelers,
  }
}
