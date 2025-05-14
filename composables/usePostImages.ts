import { ref, onMounted } from 'vue'

export const usePostImages = () => {
  const images = ref<string[]>([])

  onMounted(() => {
    const date = '2025-05-14_17-52-53'
    // Start with a reasonable number of images and let it fail gracefully if some don't exist
    const totalImages = 20
    const files = Array.from({ length: totalImages }, (_, i) => {
      const num = totalImages - i // Reverse order
      return `photo_${num}_${date}.jpg`
    })
    images.value = files
  })

  return {
    images
  }
}
