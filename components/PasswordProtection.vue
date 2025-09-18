<template>
  <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center bg-gradient-to-b from-base-100 to-base-200/30">
    <div class="absolute top-4 right-4 text-sm opacity-70">
      Password: onchain2025
    </div>
    <div class="card w-96 bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <h2 class="card-title text-2xl font-black">Password Protected</h2>
        <p class="text-lg opacity-90">This page requires authentication to view.</p>
        <div class="form-control w-full">
          <input 
            type="password" 
            v-model="password"
            placeholder="Enter password"
            class="input input-bordered w-full mt-4"
            @keyup.enter="authenticate"
          />
          <p v-if="error" class="text-error mt-2 text-sm">{{ error }}</p>
        </div>
        <div class="card-actions justify-end mt-4">
          <button @click="authenticate" class="btn bg-[#f34336]">Access Page</button>
        </div>
      </div>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  correctPassword: string
}>()

const isAuthenticated = ref(false)
const password = ref('')
const error = ref('')

// Check URL query parameter for password
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const pwdParam = urlParams.get('pwd')
  if (pwdParam === props.correctPassword) {
    isAuthenticated.value = true
  }
})

function authenticate() {
  if (password.value === props.correctPassword) {
    isAuthenticated.value = true
    error.value = ''
  } else {
    error.value = 'Incorrect password'
    password.value = ''
  }
}
</script>
