export interface Lead {
  id: string
  birth_year: number
  name: string
  email: string
  whatsapp: string
  coupon_code: string
  coupon_condition: string | null
  zodiac_sign_name: string
  pin: string | null
  created_at: string
}

export const CSV_COLUMNS = [
  { key: 'birth_year', label: 'Ano' },
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'coupon_code', label: 'Cupom' },
  { key: 'pin', label: 'PIN' },
  { key: 'coupon_condition', label: 'Condição do cupom' },
  { key: 'zodiac_sign_name', label: 'Signo' },
  { key: 'created_at', label: 'Data' },
] as const

export type LeadCsvColumnKey = (typeof CSV_COLUMNS)[number]['key']
