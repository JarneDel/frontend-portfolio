<template>
  <div class="flex flex-row justify-between">
    <ul class="flex-rows mx-6 my-4 flex gap-8">
      <li v-for="link of links">
        <StyledNuxtLink :to="link.path">
          <Component :is="link.icon" />
          <p>{{ link.text }}</p>
        </StyledNuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ILink } from '~/Interfaces/ILink'
import { PropType } from '@vue/runtime-core'

const pros = defineProps({
  links: {
    type: Array as PropType<ILink[]>,
    required: true,
  },
})
</script>
