<template>
  <article
    class="flex max-w-4xl flex-col gap-16 py-12 md:flex-row md:items-center md:justify-center md:py-48"
    id="about"
  >
    <div class="flex flex-col md:basis-3/5">
      <h2
        class="mb-4 w-full max-w-[32rem] text-3xl font-bold text-gray-900 dark:text-gray-100"
      >
        About me
      </h2>
      <p
        class="mb-4 max-w-[32rem] leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg"
      >
        Hi there! I'm a <strong>full-stack web developer</strong> and
        <strong>Linux</strong> enthusiast based in <strong>Flanders</strong>. I
        enjoy building beautiful and functional websites. As a
        <strong>student</strong>, I'm constantly <strong>learning</strong> to
        stay on top of the latest technologies.
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

    <div class="flex p-2 md:justify-center lg:basis-2/5">
      <NoiseImage
        src="/images/profile.webp"
        alt="Profile"
        width="300px"
        aspect-ratio="1"
        :noise-scale="noiseScale"
        class="rounded-lg shadow-lg"
        :zoom-scale="1.05"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import NoiseImage from '~/components/Styled/noiseImage.vue'

const { viewportWidth } = useViewportSize()

const noiseScale = computed((): number => {
  if (viewportWidth.value > 1024) {
    return 15
  } else if (viewportWidth.value > 768) {
    return 13
  } else {
    return 10
  }
})
</script>
