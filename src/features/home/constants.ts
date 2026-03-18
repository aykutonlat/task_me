import type { SelectOption } from '@/types/ui'

import type { ServiceCard } from '@/features/home/types'

export const TRAVELER_OPTIONS: SelectOption[] = [
  { label: '1 Traveler', value: '1 Traveler' },
  { label: '2 Travelers', value: '2 Travelers' },
  { label: '3 Travelers', value: '3 Travelers' },
  { label: '4 Travelers', value: '4 Travelers' },
]

export function createInitialServiceCards(count = 5): ServiceCard[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: 'Green Tour Cappadocia tur adı buraya gelecek',
    duration: 'Duration 1 Day',
    rating: '4.9',
    oldPrice: '199.90 €',
    price: '199.90 €',
    perPersonLabel: 'Per person',
    primaryBadge: 'Best Seller',
    secondaryBadge: 'Save 38%',
    imageSrc: '/pngtree-skiing-and-snowy-mountains-winter-sport-png-image_12602110.png',
    imageAlt: 'Green Tour Cappadocia',
    date: '',
    traveler: '',
  }))
}
