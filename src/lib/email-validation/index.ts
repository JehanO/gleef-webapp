// src/lib/email-validation/index.ts
import { disposableDomains, freeEmailProviders } from './domains'

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export const isCompanyEmail = (email: string): boolean => {
    const fullDomain = email.split('@')[1]?.toLowerCase()
    if (!fullDomain) return false

    // Split domain and filter out any empty strings just in case
    const domainParts = fullDomain.split('.').filter((part): part is string => !!part)

    // Check if any part of the domain matches a free email provider
    return !domainParts.some(part => 
        freeEmailProviders.includes(part) || 
        disposableDomains.includes(part)
    )
}