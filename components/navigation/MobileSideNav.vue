<template>
  <aside
    class="fixed top-0 bottom-0 right-0 z-10 flex h-full w-4/5 transform flex-col bg-background-light-300/90 p-4 shadow-lg backdrop-blur transition-transform duration-300 ease-in-out dark:bg-background-dark-300/90"
    :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
  >
    <div class="flex h-full flex-col">
      <div class="flex h-full flex-col">
        <ul
          class="flex h-full w-full flex-col justify-center gap-y-6 align-middle"
        >
          <li>
            <NuxtLink
              :to="'/#about'"
              @click="$emit('close')"
              class="flex flex-row items-center justify-center gap-4"
            >
              <User class="h-6 w-6"></User>
              <p class="text-lg">About</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/#projects'"
              @click="$emit('close')"
              class="flex flex-row items-center justify-center gap-4"
            >
              <Code2 class="h-6 w-6" />
              <p class="text-lg">Projects</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/#contact'"
              @click="$emit('close')"
              class="flex flex-row items-center justify-center gap-4"
            >
              <Contact></Contact>
              <p>Contact</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="'/#Resume'"
              @click="$emit('close')"
              class="flex flex-row items-center justify-center gap-4"
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
