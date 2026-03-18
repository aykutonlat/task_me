export type UiSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface AccordionItem {
  id: string
  title: string
  description: string
  buttonLabel: string
}
