<template>
  <article
    class="flex max-w-4xl flex-col flex-col items-center justify-center gap-16 md:py-48 lg:flex-row"
    id="about"
  >
    <div class="lg:basis-3/5">
      <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
        About me
      </h2>
      <p
        class="mb-4 max-w-[32rem] leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg"
      >
        Hi there! I'm a <strong>full-stack web developer</strong> and
        <strong>Linux</strong> enthusiast with a passion for building beautiful
        and functional websites. As a <strong>student</strong>, I'm constantly
        <strong>learning</strong> to stay on top of the latest technologies.
      </p>
      <p
        class="mb-4 max-w-[32rem] leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg"
      >
        With my strong technical skills and attention to detail, I strive to
        create <strong>seamless</strong> user experiences that bring ideas to
        life. When I'm not coding away at my computer or studying for exams, you
        can find me tinkering with Linux and exploring new technologies.
      </p>
    </div>

    <div class="lg:basis-2/5">
      <nuxt-img src="/profile.jpg" alt="Profile" />
    </div>
  </article>
</template>
