<template>
  <Head>
    <title>Hobbies | Jarne's Portfolio</title>
  </Head>
  <Body
    class="from-background-light-500 via-background-light-300 to-background-light-100 dark:from-background-dark-500 dark:via-background-dark-300 dark:to-background-dark-100 bg-gradient-to-tr bg-no-repeat md:bg-fixed"
  ></Body>
  <div
    class="mx-auto mt-20 flex max-w-[70rem] flex-col items-center justify-center"
  >
    <DividerTitle text="World of tanks" />
    <WoTWidget class="mb-10" />
    <DividerTitle text="Steam" />
    <SteamWidget />
  </div>
</template>

<script setup lang="ts"></script>
