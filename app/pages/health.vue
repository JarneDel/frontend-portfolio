<template>
  <Body
    class="flex min-h-screen flex-col items-center justify-center p-4 from-background-light-500 via-background-light-300 to-background-light-100 bg-linear-to-tr bg-no-repeat dark:from-background-dark-500 dark:via-background-dark-300 dark:to-background-dark-100"
  >
    <Html lang="nl-BE" />
    <div
      class="w-full max-w-md rounded-2xl bg-white/50 p-8 shadow-xl backdrop-blur-sm dark:bg-background-dark-300/50"
    >
      <h1
        class="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white"
      >
        Geboortedatum van de patiënt
      </h1>
      <p class="mb-6 text-center text-gray-600 dark:text-gray-300">
        Voer uw geboortedatum in om door te gaan.
      </p>

      <div class="space-y-4">
        <div>
          <label
            for="birthdate"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Geboortedatum
          </label>
          <input
            id="birthdate"
            type="date"
            v-model="birthdate"
            lang="nl-BE"
            class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light dark:border-gray-600 dark:bg-background-dark-700 dark:text-white dark:focus:border-primary-dark dark:focus:ring-primary-dark font-sans"
          />
        </div>

        <button
          @click="verifyAge"
          class="flex w-full justify-center rounded-lg bg-primary-light px-4 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-primary-light/20 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 dark:focus:ring-primary-dark dark:focus:ring-offset-background-dark-300"
        >
          Bevestigen
        </button>

        <p
          v-if="error"
          class="text-center text-sm font-medium text-red-500 italic animate-pulse"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </Body>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const birthdate = ref('')
const error = ref('')

const verifyAge = () => {
  const [year, month, day] = birthdate.value.split('-').map(Number)

  if (year === 2003 && month === 4 && day === 2) {
    // Set a secure cookie for 24 hours
    const cookie = useCookie('age-verified', { maxAge: 86400, sameSite: 'lax' })
    cookie.value = 'true'

    // Redirect to your protected proxy route (external: true to trigger server middleware)
    navigateTo('/docs/ongeval', { external: true })
  } else {
    error.value = 'Geboortedatum is onjuist.'
  }
}
</script>
