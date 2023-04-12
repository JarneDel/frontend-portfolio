<template>
  <div
    class="scroll-smooth bg-gradient-to-tr from-background-light-500 via-background-light-300 to-background-light-100 bg-fixed bg-no-repeat dark:from-background-dark-500 dark:via-background-dark-300 dark:to-background-dark-100"
  >
    <div
      class="min-h-screen bg-light-repeating-bg motion-safe:animate-moveBg dark:bg-dark-repeating-bg dark:text-gray-100 lg:mx-0"
    >
      <div class="mx-6 md:mx-0">
        <div
          class="fixed top-0 z-20 h-[72px] w-full transition-all duration-200"
          ref="header"
          :class="{
            '-translate-y-[72px]': isHidden,
            'bg-[#dee0dd]/80 backdrop-blur-sm backdrop-filter dark:bg-[#211f22]/20':
              isSticky,
          }"
        >
          <DesktopNavigation class="hidden md:flex" />
          <MobileNavigationButton
            class="mr-8 flex justify-end md:hidden"
            :is-open="isOpen"
            v-on:click="isOpen = !isOpen"
          />
        </div>

        <MobileSideNav
          class="md:hidden"
          :is-open="isOpen"
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

<script setup lang="ts">
const { isHidden, isSticky } = useStickyHeader()
const isOpen = ref(false)

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
