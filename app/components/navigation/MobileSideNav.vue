<template>
  <aside
    class="fixed bottom-0 right-0 top-0 z-10 flex h-full w-3/5 transform flex-col bg-background-light-300/90 p-4 shadow-lg backdrop-blur transition-all duration-300 ease-in-out dark:bg-background-dark-300/90"
    :class="{
      'translate-x-0 opacity-100': isOpen,
      'translate-x-full opacity-0': !isOpen,
      invisible: isTransparent,
      visible: !isTransparent,
    }"
  >
    <div class="flex h-full flex-col items-center">
      <div class="flex h-full flex-col">
        <ul class="flex h-full w-full flex-col justify-center align-middle">
          <li v-for="link in links" :key="link">
            <NuxtLink
              :to="link.path"
              @click="$emit('close')"
              class="focus: flex flex-row items-center gap-4 rounded-lg p-2 transition-colors duration-300 ease-in-out hocus:bg-primary-light/20 hocus:text-primary-light dark:hocus:bg-primary-dark/20 dark:hocus:text-primary-dark"
            >
              <component :is="link.icon" class="h-6 w-6" />
              <span class="text-lg">{{ link.text }}</span>
            </NuxtLink>
          </li>
          <li v-for="download of downloads" :key="download.text">
            <a
              :href="download.path"
              download=""
              target="_blank"
              rel="noopener noreferrer"
              class="border-1 flex flex-row gap-3 rounded-lg border-transparent p-2 transition-colors duration-200 focus:outline-none hocus:bg-primary-light/20 hocus:text-primary-light dark:hover:border-primary-light dark:hocus:bg-gray-600/20"
            >
              <component :is="download.icon" />
              <p>{{ download.text }}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { type ILink } from '~~/Interfaces/ILink'
import { type PropType } from '@vue/runtime-core'

const props = defineProps({
  isOpen: {
    required: false,
    default: false,
  },
  links: {
    type: Array as PropType<ILink[]>,
    required: true,
  },
  downloads: {
    type: Array as PropType<ILink[]>,
    default: [],
    required: false,
  },
})
defineEmits(['close'])
const { links, downloads } = toRefs(props)

const { isOpen } = toRefs(props)
const isTransparent = ref(isOpen.value)
watch(isOpen, value => {
  if (value) {
    isTransparent.value = false
  } else {
    setTimeout(() => {
      isTransparent.value = true
    }, 300)
  }
})
</script>
