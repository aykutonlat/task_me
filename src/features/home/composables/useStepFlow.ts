import { computed, ref, watch } from 'vue'

import type { AccordionItem } from '@/types/ui'
import type { useReservationStore } from '@/stores/reservation'

export function useStepFlow(reservationStore: ReturnType<typeof useReservationStore>) {
  const activeSection = ref('contact')
  const unlockedSectionIndex = ref(0)
  const servicesCompleted = ref(false)

  const sections: AccordionItem[] = [
    {
      id: 'contact',
      title: 'Contact Information',
      description: 'We need this information to contact you.',
      buttonLabel: 'Devam Et',
    },
    {
      id: 'travelers',
      title: 'Travelers Information',
      description: 'We need this information to confirm the reservation.',
      buttonLabel: 'Devam Et',
    },
    {
      id: 'services',
      title: 'Extra Services',
      description: 'Discover more services',
      buttonLabel: 'Devam Et',
    },
    {
      id: 'payment',
      title: 'Payment Method',
      description: 'When do you want to pay? Choose',
      buttonLabel: 'Rezervasyonu Tamamla',
    },
  ]

  const completedItems = computed(() => {
    const items: string[] = []
    if (reservationStore.contactCompleted) items.push('contact')
    if (reservationStore.travelersCompleted) items.push('travelers')
    if (servicesCompleted.value) items.push('services')
    return items
  })

  watch(
    () => completedItems.value,
    (completed) => {
      let highestCompletedIndex = -1
      completed.forEach((id) => {
        const idx = sections.findIndex((item) => item.id === id)
        if (idx > highestCompletedIndex) highestCompletedIndex = idx
      })
      if (highestCompletedIndex >= 0) {
        unlockedSectionIndex.value = Math.max(unlockedSectionIndex.value, highestCompletedIndex + 1)
      }
    },
    { immediate: true },
  )

  function canOpenSection(itemId: string) {
    const idx = sections.findIndex((item) => item.id === itemId)
    if (idx === -1) return false
    return idx <= unlockedSectionIndex.value
  }

  function onAccordionAction(itemId: string) {
    const currentIndex = sections.findIndex((section) => section.id === itemId)
    if (currentIndex >= 0) {
      unlockedSectionIndex.value = Math.max(unlockedSectionIndex.value, currentIndex + 1)
    }
    if (itemId === 'contact') reservationStore.setContactCompleted(true)
    if (itemId === 'travelers') reservationStore.setTravelersCompleted(true)
    if (itemId === 'services') servicesCompleted.value = true
  }

  return {
    activeSection,
    sections,
    completedItems,
    canOpenSection,
    onAccordionAction,
  }
}
