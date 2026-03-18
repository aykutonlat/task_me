import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservation', () => {
  const contactCompleted = ref(false)
  const travelersCompleted = ref(false)

  function setContactCompleted(value: boolean) {
    contactCompleted.value = value
  }

  function setTravelersCompleted(value: boolean) {
    travelersCompleted.value = value
  }

  return {
    contactCompleted,
    travelersCompleted,
    setContactCompleted,
    setTravelersCompleted,
  }
})
