import { ref } from 'vue'

export const useFetchContent = () => {  
  const launches = ref([])
  
  const fetchLaunches = async () => {
    try {
      const response = await fetch('/api/launches')
      const data = await response.json()
      launches.value = data || []
    } catch (error) {
      console.error('Error fetching launches:', error)
      launches.value = []
    }
  }
  
  fetchLaunches()

  return {
    businesses: { launches }
  }
}
