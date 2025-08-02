<template>
  <div class="flex flex-col items-center md:mx-6">
    <Head>
      <title>Jarne Delarue</title>
    </Head>
    <Html lang="en" />
    <Body
      class="bg-gradient-to-tr from-background-light-500 via-background-light-300 to-background-light-100 bg-no-repeat md:bg-fixed dark:from-background-dark-500 dark:via-background-dark-300 dark:to-background-dark-100"
    ></Body>
    <div class="max-w-[55rem]">
      <SectionFold />
      <SectionAbout />
      <SectionProjects />
      <SectionContact />
      <SteamWidget />
    </div>
    <div class="cursor-background" ref="cursorBackground" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useMouse, useRafFn, useWindowScroll } from '@vueuse/core'

const { x, y } = useMouse()
const { y: scrollY } = useWindowScroll()
const cursorBackground = ref<HTMLElement>()

const translateX = ref<string>('0px')
const translateY = ref<string>('0px')

// Easing factor for the trailing effect
const easing = 0.15 // Lower value increases the trailing effect

// Reactive position object for the cursor background
const currentPos = reactive({
  x: x.value,
  y: y.value,
})

// Update position with easing to create the trailing effect
const updatePosition = () => {
  const dx = x.value - currentPos.x
  const dy = y.value - currentPos.y - scrollY.value

  // Gradually move towards the mouse position
  currentPos.x += dx * easing
  currentPos.y += dy * easing

  if (cursorBackground.value) {
    translateX.value =
      currentPos.x - cursorBackground.value.offsetWidth / 2 + 'px'
    translateY.value =
      currentPos.y - cursorBackground.value.offsetHeight / 2 + 'px'
  }
}

// Use RAF to update smoothly
const { pause, resume } = useRafFn(updatePosition, { immediate: true })

onMounted(() => {
  // Start RAF loop
  resume()

  // Cleanup on unmount
  onUnmounted(() => {
    pause()
  })
})
</script>

<style scoped lang="scss">
.cursor-background {
  --cursor-size: 150px;

  position: fixed;
  top: 0;
  left: 0;
  width: var(--cursor-size);
  height: var(--cursor-size);
  border-radius: 50%;
  background-color: #2dd4bf; 
  opacity: 0.1;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: overlay;
  box-shadow: 0 0 calc(var(--cursor-size) / 2) calc(var(--cursor-size) / 3)
    rgba(45, 212, 191, 0.5); 
  filter: blur(10px);
  animation: morph 3s infinite ease-in-out;
  translate: v-bind(translateX) v-bind(translateY) 0;
}

/* Keyframes for spotlight morphing */
@keyframes morph {
  0% {
    scale: 1;
    border-radius: 50%; /* Perfect circle */
    /* Adjusted box-shadow for larger size */
    box-shadow: 0 0 60px 30px rgba(45, 212, 191, 0.5);
    filter: blur(10px);
  }
  25% {
    scale: 1.1 0.95;
    border-radius: 48%; /* Slight oval */
    /* Adjusted box-shadow for larger size */
    box-shadow: 0 0 80px 40px rgba(45, 212, 191, 0.6);
    filter: blur(12px);
  }
  50% {
    scale: 0.95 1.05;
    border-radius: 52%; /* Subtle distortion */
    /* Adjusted box-shadow for larger size */
    box-shadow: 0 0 50px 20px rgba(45, 212, 191, 0.4);
    filter: blur(8px);
  }
  75% {
    scale: 1.05 1;
    border-radius: 50%; /* Circle again */
    /* Adjusted box-shadow for larger size */
    box-shadow: 0 0 70px 35px rgba(45, 212, 191, 0.55);
    filter: blur(11px);
  }
  100% {
    scale: 1;
    border-radius: 50%; /* Perfect circle */
    /* Adjusted box-shadow for larger size */
    box-shadow: 0 0 60px 30px rgba(45, 212, 191, 0.5);
    filter: blur(10px);
  }
}
</style>
