<template>
  <div class="py-1 pl-3">
    <!--    <button-->
    <!--      v-on:click="$emit('click')"-->
    <!--      class="grid items-center rounded-lg border-2 border-transparent p-1 outline-none focus-visible:border-solid focus-visible:border-primary-light dark:shadow-primary-dark dark:focus-visible:border-primary-light"-->
    <!--    >-->
    <!--      <svg-->
    <!--        v-if="!isOpen"-->
    <!--        xmlns="http://www.w3.org/2000/svg"-->
    <!--        class="h-6 w-6"-->
    <!--        fill="none"-->
    <!--        viewBox="0 0 24 24"-->
    <!--        stroke="currentColor"-->
    <!--      >-->
    <!--        <path-->
    <!--          stroke-linecap="round"-->
    <!--          stroke-linejoin="round"-->
    <!--          stroke-width="2"-->
    <!--          d="M4 6h16M4 12h16M4 18h16"-->
    <!--        />-->
    <!--      </svg>-->
    <!--      <svg-->
    <!--        v-else-->
    <!--        xmlns="http://www.w3.org/2000/svg"-->
    <!--        class="h-6 w-6"-->
    <!--        fill="none"-->
    <!--        viewBox="0 0 24 24"-->
    <!--        stroke="currentColor"-->
    <!--      >-->
    <!--        <path-->
    <!--          stroke-linecap="round"-->
    <!--          stroke-linejoin="round"-->
    <!--          stroke-width="2"-->
    <!--          d="M6 18L18 6M6 6l12 12"-->
    <!--        />-->
    <!--      </svg>-->
    <!--    </button>-->
    <input
      type="checkbox"
      name=""
      id=""
      class="peer"
      @change="$emit('click')"
    />
    <div class="hamburger-lines">
      <span class="line line-1 bg-black dark:bg-white"></span>
      <span class="line line-2 bg-black dark:bg-white"></span>
      <span class="line line-3 bg-black dark:bg-white"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
defineProps({
  isOpen: {
    type: Boolean || undefined,
    required: true,
    default: false,
  },
})
</script>

<style scoped>
.hamburger-lines {
  height: 26px;
  width: 32px;
  position: absolute;
  top: 17px;
  right: 40px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.line {
  height: 3px;
  width: 100%;
  transition: all 0.3s ease;
}
.line-1 {
  transform-origin: 0 0;
  transition: transform 0.4s ease-in-out;
}
.line-2 {
  transition: transform 0.2s ease-in-out;
}
.line-3 {
  transform-origin: 0 100%;
  transition: transform 0.4s ease-in-out;
}
input:checked ~ .hamburger-lines .line-1 {
  transform: rotate(45deg);
}
input:checked ~ .hamburger-lines .line-2 {
  transform: scale(0);
}
input:checked ~ .hamburger-lines .line-3 {
  transform: rotate(-45deg);
}
input {
  position: absolute;
  display: block;
  height: 32px;
  width: 32px;
  top: 20px;
  right: 40px;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}
</style>
