<template>
  <div class="flex flex-row justify-between">
    <ul class="flex-rows mx-6 my-4 flex gap-8">
      <li v-for="link of links">
        <StyledNuxtLink :to="link.path">
          <component :is="link.icon" />
          <p>{{ link.text }}</p>
        </StyledNuxtLink>
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
</template>
<script setup lang="ts">
import { type ILink } from '~/Interfaces/ILink'
import { type PropType } from '@vue/runtime-core'

const props = defineProps({
  links: {
    type: Array as PropType<ILink[]>,
    required: true,
  },
  downloads: {
    type: Array as PropType<ILink[]>,
    required: true,
  },
})

const { links, downloads } = toRefs(props)
</script>
