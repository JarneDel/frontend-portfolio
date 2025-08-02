<template>
  <div class="w-full">
    <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
      Contact Form
    </h2>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div class="hidden">
        <label for="honeypot" class="sr-only">Leave this field blank</label>
        <input type="text" id="honeypot" name="honeypot" v-model="honeypot" />
      </div>

      <div>
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="formData.name"
          required
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-light focus:outline-none focus:ring-primary-light sm:text-sm dark:border-gray-600 dark:bg-background-dark-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-dark dark:focus:ring-primary-dark"
        />
        <div
          v-if="validationErrors?.data?.name"
          class="mt-1 text-sm text-red-500"
        >
          {{ validationErrors.data.name }}
        </div>
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-light focus:outline-none focus:ring-primary-light sm:text-sm dark:border-gray-600 dark:bg-background-dark-500 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-dark dark:focus:ring-primary-dark"
        />
        <div
          v-if="validationErrors?.data?.email"
          class="mt-1 text-sm text-red-700"
        >
          {{ validationErrors.data.email }}
        </div>
      </div>

      <div>
        <label
          for="message"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Message</label
        >
        <textarea
          id="message"
          v-model="formData.message"
          required
          rows="4"
          class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-light focus:outline-none focus:ring-primary-light sm:text-sm dark:border-gray-600 dark:bg-background-dark-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-dark dark:focus:ring-primary-dark"
        ></textarea>
        <div
          v-if="validationErrors?.data?.message"
          class="mt-1 text-sm text-red-500"
        >
          {{ validationErrors.data.message }}
        </div>
      </div>

      <div v-if="errorMessage" class="mt-2 text-sm text-red-500">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="mt-2 text-sm text-green-500">
        {{ successMessage }}
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="flex w-full justify-center rounded-md border border-transparent bg-primary-light px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 dark:focus:ring-primary-dark dark:focus:ring-offset-background-dark-300"
      >
        <span v-if="!isSubmitting">Send Message</span>
        <span v-else>Sending...</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const honeypot = ref('') // Add honeypot field
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const validationErrors = ref({}) // Store validation errors per field

const submitForm = async () => {
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  validationErrors.value = {} // Clear previous validation errors

  if (honeypot.value) {
    // If the honeypot field is filled, it's likely a bot.  Silently ignore.
    console.log('Bot detected!')
    isSubmitting.value = false
    return
  }

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: { ...formData.value, honeypot: honeypot.value },
    })

    if (response.success) {
      successMessage.value = 'Message sent successfully!'
      formData.value = { name: '', email: '', message: '' }
      honeypot.value = '' // Clear honeypot
    }
  } catch (error) {
    console.log('Error caught:', error)

    if (error.statusCode === 400 && error.data) {
      // Use error.data directly - it contains field-specific validation errors
      // e.g., { message: "Please enter a longer message" } or { email: "Invalid email format" }
      validationErrors.value = error.data
      errorMessage.value = '' // Clear general error message
    } else {
      // Handle other types of errors
      errorMessage.value =
        error.statusMessage || 'Failed to send message. Please try again later.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
