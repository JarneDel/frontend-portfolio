<template>
  <NuxtLoadingIndicator color="#2dd4bf" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
::-webkit-scrollbar {
  width: 0.2em;
}
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar {
    background-color: #211f22;
  }
}

::-webkit-scrollbar:hover {
  width: 0.5em;
}

::-webkit-scrollbar-thumb {
  background-color: #2dd4bf7f;
  outline: 1px solid rgb(45, 212, 191, 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(45, 212, 191);
  outline-width: 2px;
}

body {
  overflow-x: hidden;
}

@media (min-width: 768px) {
  html {
    scroll-behavior: smooth;
  }
}

::selection {
  background: #f2aeff;
  color: #4e165f;
}
@media (prefers-color-scheme: dark) {
  ::selection {
    background: #f2aeff;
    color: #4e165f;
  }
}
</style>
