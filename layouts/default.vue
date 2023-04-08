<template>
  <div
    class="scroll-smooth bg-gradient-to-tr from-background-light-500 via-background-light-300 to-background-light-100 bg-fixed bg-no-repeat dark:from-background-dark-500 dark:via-background-dark-300 dark:to-background-dark-100"
  >
    <div
      class="min-h-screen bg-light-repeating-bg motion-safe:animate-moveBg dark:bg-dark-repeating-bg dark:text-gray-100 lg:mx-0"
    >
      <div class="mx-6 md:mx-0">
        <div
          class="fixed top-0 z-10 w-full transition-all duration-200"
          ref="header"
          :class="
            (isHidden && '-translate-y-[72px]') ||
            (isSticky &&
              'bg-[#dee0dd]/80 backdrop-blur-sm backdrop-filter dark:bg-[#211f22]/20')
          "
        >
          <DesktopNavigation v-if="viewportWidth > 768" />
          <MobileSideNav v-else-if="viewportWidth > 0" />
          <Loader2 class="animate-spin" v-else />
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
const { viewportWidth } = useViewportSize()
const { isHidden, isSticky } = useStickyHeader()
</script>
