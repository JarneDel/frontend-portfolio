<template>
  <div
    class="bg-gradient-to-tr from-background-light-500 via-background-light-300 to-background-light-100 bg-no-repeat dark:from-background-dark-500 dark:via-background-dark-300 dark:to-background-dark-100 md:bg-fixed"
  >
    <div
      class="min-h-screen bg-light-repeating-bg dark:bg-dark-repeating-bg dark:text-gray-100 md:motion-safe:animate-moveBg lg:mx-0"
    >
      <div class="mx-6">
        <div
          class="fixed left-0 right-0 top-0 z-20 flex h-[72px] w-full flex-row justify-between transition-all duration-200 md:mx-0"
          ref="header"
          :class="{
            '-translate-y-[72px]': isHidden,
            'bg-[#dee0dd]/80 backdrop-blur-sm backdrop-filter dark:bg-[#211f22]/20':
              isSticky,
          }"
        >
          <h1 class="p-3 md:mx-2">
            <NuxtLink
              to="/"
              class="logo-link hover:bg-active rounded-lg focus:outline-none"
            >
              <Logo
                class="logo rounded-lg fill-primary-light transition-colors duration-200 dark:fill-primary-light"
              ></Logo>
            </NuxtLink>
          </h1>
          <DesktopNavigation
            class="hidden md:flex"
            :links="links"
            :downloads="downloads"
          />
          <MobileNavigationButton
            class="md:hidden"
            :is-open="isOpen"
            v-on:click="isOpen = !isOpen"
          />
        </div>
        <MobileSideNav
          class="md:hidden"
          :is-open="isOpen"
          :links="links"
          :downloads="downloads"
          v-on:close="isOpen = false"
        />
        <div ref="scrollLockContent">
          <slot />
        </div>
        <Foot></Foot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-link:is(:hover, :focus-visible) .logo {
  fill: #e5e7eb;
  background: rgb(35 166 148 / 0.2);
}

@media (prefers-color-scheme: dark) .logo {
  .logo:is(:hover, :focus-visible) {
    fill: #1f2937;
    background: rgb(75 85 99 / 0.2);
  }
}
</style>

<script setup lang="ts">
import { ILink } from '~/Interfaces/ILink'

const { isHidden, isSticky } = useStickyHeader()
import { User, Contact, Code2, FileText } from 'lucide-vue-next'

const isOpen = ref(false)
const links: ILink[] = [
  {
    text: 'About',
    path: '/about',
    icon: User,
  },
  {
    text: 'Projects',
    path: '/#projects',
    icon: Code2,
  },
  {
    text: 'Contact',
    path: '/#contact',
    icon: Contact,
  },
]
const downloads: ILink[] = [
  {
    text: 'Resume',
    path: '/resume.pdf',
    icon: FileText,
  },
]

onMounted(() => {
  watchEffect(() => {
    if (isOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'overlay'
    }
  })
})
</script>
