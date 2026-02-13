
/*
  Sample output: $15.00 , 15 , USD
*/
export function formatPrice(amount: number, currency: string = 'USD'): string {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    throw new TypeError('Amount must be a valid number')
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}


export function formatName(firstName: string, lastName: string): string {
  if (!firstName || !lastName) {
    throw new Error('Both firstName and lastName are required')
  }

  const trimmedFirst = firstName.trim()
  const trimmedLast = lastName.trim()

  if (!trimmedFirst || !trimmedLast) {
    throw new Error('Names cannot be empty after trimming')
  }

  return `${trimmedLast}, ${trimmedFirst}`
}


export function normalizeEmail(email: string): string {
  const trimmed = email.trim().toLowerCase()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(trimmed)) {
    throw new Error('Invalid email format')
  }

  return trimmed
}


export function truncateText(text: string, maxLength: number = 50): string {
  if (typeof text !== 'string') {
    throw new TypeError('Text must be a string')
  }

  if (maxLength <= 0) {
    throw new Error('Max length must be positive')
  }

  if (text.length <= maxLength) {
    return text
  }

  return text.substring(0, maxLength - 3) + '...'
}
