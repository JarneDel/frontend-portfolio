<template>
  <button v-on:click="isOpen = !isOpen">open side nav</button>
  <aside
    class="fixed top-0 bottom-0 right-0 z-50 flex h-full w-4/5 transform flex-col justify-between bg-white p-4 transition-transform duration-300 ease-in-out dark:bg-gray-900"
    :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
  >
    <div class="flex h-full flex-col justify-between">
      <div class="flex h-full flex-col justify-between">
        <button v-on:click="isOpen = !isOpen">open side nav</button>

        <ul class="flex h-full flex-col justify-between">
          <li>
            <StyledNuxtLink :to="{ hash: '#about' }" @click="close">
              <User></User>
              <p>About</p>
            </StyledNuxtLink>
          </li>
          <li>
            <StyledNuxtLink :to="'/#projects'" @click="close">
              <Code2 />
              <p>Projects</p>
            </StyledNuxtLink>
          </li>
          <li>
            <StyledNuxtLink :to="'/#contact'" @click="close">
              <Contact></Contact>
              <p>Contact</p>
            </StyledNuxtLink>
          </li>
          <li>
            <StyledNuxtLink :to="'/#Resume'" @click="close">
              <file-text />
              <p>Resume</p>
            </StyledNuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { User, Contact, Code2, FileText } from 'lucide-vue-next'
const isOpen = ref(false)
const close = () => (isOpen.value = false)
</script>
