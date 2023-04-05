<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
::-webkit-scrollbar {
  width: 0.3em;
  background-color: transparent;
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
  overflow: overlay;
}
::selection {
  background: #2dd4bf;
  color: #fff;
}
@media (prefers-color-scheme: dark) {
  ::selection {
    background: #15665b;
    color: #fff;
  }
}
</style>
