<template>
  <aside
    class="fixed top-0 bottom-0 right-0 z-10 flex h-full w-3/5 transform flex-col bg-background-light-300/90 p-4 shadow-lg backdrop-blur transition-transform duration-300 ease-in-out dark:bg-background-dark-300/90"
    :class="{ 'translate-x-0': isOpen, 'hidden translate-x-full': !isOpen }"
  >
    <div class="flex h-full flex-col">
      <div class="flex h-full flex-col">
        <ul class="flex h-full w-full flex-col justify-center align-middle">
          <li>
            <NuxtLink
              :to="'/#about'"
              @click="$emit('close')"
              class="focus: flex flex-row items-center justify-center gap-4 rounded-lg p-2 transition-colors duration-300 ease-in-out hocus:bg-primary-light/20 hocus:text-primary-light dark:hocus:bg-primary-dark/20 dark:hocus:text-primary-dark"
            >
              <User class="h-6 w-6"></User>
              <p class="text-lg">About</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/#projects'"
              @click="$emit('close')"
              class="flex flex-row items-center justify-center gap-4 rounded-lg p-2 transition-colors duration-300 ease-in-out hocus:bg-primary-light/20 hocus:text-primary-light dark:hocus:bg-primary-dark/20 dark:hocus:text-primary-dark"
            >
              <Code2 class="h-6 w-6" />
              <p class="text-lg">Projects</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/#contact'"
              @click="$emit('close')"
              class="flex flex-row items-center justify-center gap-4 rounded-lg p-2 transition-colors duration-300 ease-in-out hocus:bg-primary-light/20 hocus:text-primary-light dark:hocus:bg-primary-dark/20 dark:hocus:text-primary-dark"
            >
              <Contact></Contact>
              <p>Contact</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/#Resume'"
              @click="$emit('close')"
              class="flex flex-row items-center justify-center gap-4 rounded-lg p-2 transition-colors duration-300 ease-in-out hocus:bg-primary-light/20 hocus:text-primary-light dark:hocus:bg-primary-dark/20 dark:hocus:text-primary-dark"
            >
              <file-text />
              <p>Resume</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { User, Contact, Code2, FileText } from 'lucide-vue-next'
defineProps({
  isOpen: {
    type: Boolean || undefined,
    required: false,
    default: false,
  },
})
defineEmits(['close'])
</script>
