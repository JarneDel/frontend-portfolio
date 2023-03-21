<template>
  <div class="min-h-screen dark:bg-gray-900 dark:text-gray-100">
      <div class="flex flex-row-reverse justify-between shadow ">
        <ul class="mx-6 flex flex-rows gap-8 my-4" >
          <li>
            <NuxtLink to="/#about" class="flex flex-row gap-3 hocus:ring-2 hocus:rounded-sm hocus:ring-gray-400 hocus:bg-gray-300 hocus:ring-offset-8 :hocus:ring-offset-gray-400
        hocus:dark:ring-gray-600 dark:hocus:bg-gray-700 dark:hocus:ring-offset-gray-700 focus:outline-none">
              <user ></user>
              <p>About</p>
            </NuxtLink>
          </li>
          <li >
            <NuxtLink to="#projects" class="flex flex-row gap-3 flex-row gap-3 hocus:ring-2 hocus:rounded-sm hocus:ring-gray-400 hocus:bg-gray-300 hocus:ring-offset-8 :hocus:ring-offset-gray-400
        hocus:dark:ring-gray-600 dark:hocus:bg-gray-700 dark:hocus:ring-offset-gray-700 focus:outline-none">
              <Code2/>
              <p>Projects</p>
            </NuxtLink>
          </li>
          <li >
            <NuxtLink to="/contact" class="flex flex-row gap-3 flex-row gap-3 hocus:ring-2 hocus:rounded-sm hocus:ring-gray-400 hocus:bg-gray-300 hocus:ring-offset-8 :hocus:ring-offset-gray-400
        hocus:dark:ring-gray-600 dark:hocus:bg-gray-700 dark:hocus:ring-offset-gray-700 focus:outline-none">
              <Contact></Contact>
              <p>Contact</p>
            </NuxtLink>
          </li>
          <li >
            <NuxtLink to="/Resume" class="flex flex-row gap-3 flex-row gap-3 hocus:ring-2 hocus:rounded-sm hocus:ring-gray-400 hocus:bg-gray-300 hocus:ring-offset-8 :hocus:ring-offset-gray-400
        hocus:dark:ring-gray-600 dark:hocus:bg-gray-700 dark:hocus:ring-offset-gray-700 focus:outline-none" >
              <file-text/>
              <p>Resume</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    <slot/>
  </div>
</template>


<script setup lang="ts">
import {ChevronLeft, User, Contact, Code2, FileText} from "lucide-vue-next";
const sideBarExpanded = ref(true)
</script>

<style scoped>
.shadow{
  box-shadow: 0 0 6px 4px rgba(0,0,0,.3);
}
</style>