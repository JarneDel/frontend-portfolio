<template>

  <div class="flex flex-row-reverse justify-between ">
    <ul class="mx-6 flex flex-rows gap-8 my-4" >
      <li>
        <NuxtLink to="/#about" class="flex flex-row gap-3 hocus:ring-2 hocus:rounded-sm hocus:ring-gray-400 hocus:bg-gray-300 hocus:ring-offset-8 :hocus:ring-offset-gray-400
        hocus:dark:ring-gray-600 dark:hocus:bg-gray-700 dark:hocus:ring-offset-gray-700 focus:outline-none">
          <user ></user>
          <p v-if="sideBarExpanded">About</p>
        </NuxtLink>
      </li>
      <li >
        <NuxtLink to="#projects" class="flex flex-row gap-3 flex-row gap-3 hocus:ring-2 hocus:rounded-sm hocus:ring-gray-400 hocus:bg-gray-300 hocus:ring-offset-8 :hocus:ring-offset-gray-400
        hocus:dark:ring-gray-600 dark:hocus:bg-gray-700 dark:hocus:ring-offset-gray-700 focus:outline-none">
          <Code2/>
          <p v-if="sideBarExpanded">Projects</p>
        </NuxtLink>
      </li>
      <li >
        <NuxtLink to="/contact" class="flex flex-row gap-3 flex-row gap-3 hocus:ring-2 hocus:rounded-sm hocus:ring-gray-400 hocus:bg-gray-300 hocus:ring-offset-8 :hocus:ring-offset-gray-400
        hocus:dark:ring-gray-600 dark:hocus:bg-gray-700 dark:hocus:ring-offset-gray-700 focus:outline-none">
          <Contact></Contact>
          <p v-if="sideBarExpanded">Contact</p>
        </NuxtLink>
      </li>
      <li >
        <NuxtLink to="/Resume" class="flex flex-row gap-3 flex-row gap-3 hocus:ring-2 hocus:rounded-sm hocus:ring-gray-400 hocus:bg-gray-300 hocus:ring-offset-8 :hocus:ring-offset-gray-400
        hocus:dark:ring-gray-600 dark:hocus:bg-gray-700 dark:hocus:ring-offset-gray-700 focus:outline-none" >
          <file-text/>
          <p v-if="sideBarExpanded">Resume</p>
        </NuxtLink>
      </li>
    </ul>
  </div>

</template>

<script setup lang="ts">
import {ChevronLeft, User, Contact, Code2, FileText} from "lucide-vue-next";
const sideBarExpanded = ref(true)

const toggle = () => {
  sideBarExpanded.value = !sideBarExpanded.value
}
</script>

<style scoped>
.rotate{
  transform: rotate(180deg);
}

</style>