<template>
  <div>
    <!-- Main Consent Banner -->
    <div v-if="showConsent" class="fixed bottom-4 left-4 right-4 md:max-w-lg md:left-4 z-50">
      <div class="bg-base-200 rounded-lg shadow-xl p-6">
        <h3 class="text-lg font-semibold mb-3">Enhance Your Experience</h3>
        <p class="text-sm opacity-90 mb-4">
          We use AI to provide personalized assistance and improve our services. By continuing, 
          you agree that we may securely store your chat interactions and provided information.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-2">
          <button 
            @click="accept"
            class="btn btn-primary flex-1"
          >
            Accept & Continue
          </button>
          <button 
            @click="showDetailsModal = true"
            class="btn btn-outline flex-1"
          >
            Read More
          </button>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <dialog id="details_modal" class="modal" :class="{ 'modal-open': showDetailsModal }">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-lg mb-4">Data Usage & Privacy Information</h3>
        
        <div class="space-y-4 text-sm">
          <div>
            <h4 class="font-semibold mb-2">How We Use Your Data</h4>
            <p>Our AI-powered chat service is designed to provide you with personalized assistance. To deliver this service:</p>
            <ul class="list-disc ml-6 mt-2 space-y-1">
              <li>Chat interactions are securely stored in our database</li>
              <li>Your provided information (like email) is encrypted and stored securely</li>
              <li>We use third-party AI APIs to process and respond to your queries</li>
              <li>Basic usage data helps us improve our service quality</li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-2">Benefits for You</h4>
            <ul class="list-disc ml-6 space-y-1">
              <li>Personalized AI assistance tailored to your needs</li>
              <li>Improved response accuracy based on context</li>
              <li>Faster and more relevant solutions to your queries</li>
              <li>Enhanced user experience through continuous learning</li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mb-2">Data Security</h4>
            <p>We prioritize the security of your data:</p>
            <ul class="list-disc ml-6 mt-2 space-y-1">
              <li>All data is encrypted in transit and at rest</li>
              <li>Access to data is strictly controlled and monitored</li>
              <li>Regular security audits ensure data protection</li>
              <li>We never sell your personal information</li>
            </ul>
          </div>
        </div>

        <div class="modal-action">
          <button class="btn btn-primary" @click="accept">Accept & Continue</button>
          <button class="btn" @click="showDetailsModal = false">Close</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showDetailsModal = false">close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCookieConsent } from '../composables/useCookieConsent'

const showConsent = ref(false)
const showDetailsModal = ref(false)
const { hasConsented, acceptConsent } = useCookieConsent()

onMounted(() => {
  if (!hasConsented()) {
    showConsent.value = true
  }
})

const accept = () => {
  acceptConsent()
  showConsent.value = false
  showDetailsModal.value = false
}
</script>
