import { ref } from 'vue'

export const useCookieConsent = () => {
  const hasConsented = (): boolean => {
    return localStorage.getItem('data-consent') === 'true'
  }

  const acceptConsent = () => {
    localStorage.setItem('data-consent', 'true')
  }

  return {
    hasConsented,
    acceptConsent
  }
}
