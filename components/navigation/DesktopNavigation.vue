<template>
  <div class="flex flex-row-reverse justify-between">
    <ul class="flex-rows mx-6 my-4 flex gap-8">
      <li>
        <StyledNuxtLink :to="{ hash: '#about' }">
          <User></User>
          <p>About</p>
        </StyledNuxtLink>
      </li>
      <li>
        <StyledNuxtLink :to="'/#projects'">
          <Code2 />
          <p>Projects</p>
        </StyledNuxtLink>
      </li>
      <li>
        <StyledNuxtLink :to="'/#contact'">
          <Contact></Contact>
          <p>Contact</p>
        </StyledNuxtLink>
      </li>
      <li>
        <StyledNuxtLink :to="'/#Resume'">
          <file-text />
          <p>Resume</p>
        </StyledNuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { User, Contact, Code2, FileText } from 'lucide-vue-next'
import StyledNuxtLink from '~/components/elements/StyledNuxtLink.vue'
</script>
