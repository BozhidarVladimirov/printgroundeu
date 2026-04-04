import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

export function calculateBulkPrice(basePrice: number, quantity: number): number {
  const tiers = [
    { min: 1, max: 49, multiplier: 1 },
    { min: 50, max: 99, multiplier: 0.95 },
    { min: 100, max: 249, multiplier: 0.9 },
    { min: 250, max: 499, multiplier: 0.85 },
    { min: 500, max: 999, multiplier: 0.8 },
    { min: 1000, max: Infinity, multiplier: 0.75 },
  ]

  const tier = tiers.find(t => quantity >= t.min && quantity <= t.max)
  return basePrice * (tier?.multiplier || 1)
}

export function getBulkDiscount(quantity: number): number {
  const tiers = [
    { min: 1, max: 49, discount: 0 },
    { min: 50, max: 99, discount: 5 },
    { min: 100, max: 249, discount: 10 },
    { min: 250, max: 499, discount: 15 },
    { min: 500, max: 999, discount: 20 },
    { min: 1000, max: Infinity, discount: 25 },
  ]

  const tier = tiers.find(t => quantity >= t.min && quantity <= t.max)
  return tier?.discount || 0
}

export function sanitizeProductName(name: string): string {
  const bgTranslitPattern = /bezzhichn|poliuretan|obiniink|gainkain|koritsa|izrabofena|ofpadatsi|lyuwithpi|inaglerodni|inlakna|tefter|poluk|butilka|karfiol|kapsula|navushnik|shlifer|yaketo|chanta|metalen/i;
  
  if (bgTranslitPattern.test(name)) {
    const brandMatch = name.match(/^([A-Z][A-Z0-9]+(?:\.[A-Z0-9]+)?)\./);
    const codeMatch = name.match(/\d{4,}/);
    if (brandMatch) {
      return `${brandMatch[1]} Product${codeMatch ? ` #${codeMatch[0]}` : ''}`.trim();
    }
    return codeMatch ? `Product #${codeMatch[0]}` : 'Corporate Product';
  }
  
  return name;
}
