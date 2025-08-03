<template>
  <div v-for="(project, number) in projects" :key="project.id">
    <div
      v-motion="{
        initial: { opacity: 0, x: number % 2 === 0 ? -100 : 100 },
        visibleOnce: {
          opacity: 1,
          x: 0,
          transition: { duration: 200, delay: 100 * number, ease: 'easeOut' },
        },
      }"
      class="mb-24 flex w-full flex-col-reverse gap-4 md:flex-row md:items-center"
      :class="project.id % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'"
    >
      <a
        class="drop-shadow-xl md:basis-1/2"
        :href="project.external ?? project.github"
      >
        <NoiseImage
          :src="project.image"
          :alt="project.imageAlt"
          aspect-ratio="16/9"
          heightPx="270"
          widthPx="470"
          :width="viewportWidth.valueOf() > 768 ? '27rem' : '32rem'"
          class="rounded-xl"
          :noise-scale="
            viewportWidth.valueOf() > 1080
              ? 15
              : viewportWidth.valueOf() > 768
                ? 13
                : 10
          "
          :zoom-scale="1.05"
          :transform-origin="project.transformOrigin"
        />
      </a>
      <div
        class="flex max-w-xl basis-1/2 flex-col md:justify-center"
        :class="project.id % 2 === 0 ? 'md:items-start' : 'md:items-end'"
      >
        <p class="font-mono text-primary-light dark:text-primary-dark">
          {{ project.category }}
        </p>
        <h3
          class="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100"
          :class="project.id % 2 === 0 ? 'md:text-left' : 'md:text-right'"
        >
          {{ project.title }}
        </h3>
        <p
          class="-m-4 mb-1 mt-2 w-full max-w-[32rem] rounded-lg bg-gray-100/30 px-4 py-2 shadow-xl dark:bg-gray-900/30"
          :class="project.id % 2 === 0 ? 'md:text-left' : 'md:text-right'"
        >
          {{ project.description }}
        </p>
        <ProjectsTechnologies
          class="max-w-[32rem]"
          :technologies="project.technologies"
          :text-alignment="project.id % 2 === 0 ? 'text-left' : 'text-right'"
        />
        <div class="flex gap-4">
          <a
            v-if="project.functionalAnalysis"
            :href="project.functionalAnalysis"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
            download
          >
            <SvgDesigndocument title="Design Document" />
          </a>
          <a
            v-if="project.designDocument"
            :href="project.designDocument"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
            download
          >
            <SvgDocument title="Design Document" />
          </a>
          <a
            v-if="project.technicalAnalysis"
            :href="project.technicalAnalysis"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
            download
            title="Technical components"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-server"
            >
              <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
              <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
              <line x1="6" x2="6.01" y1="6" y2="6" />
              <line x1="6" x2="6.01" y1="18" y2="18" />
            </svg>
          </a>
          <Github :to="project.github" v-if="project.github" />
          <External
            v-if="project.external"
            :to="project.external"
            :title="
              project.externalTitle ? project.externalTitle : 'Visit project'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const { viewportWidth } = useViewportSize()
import { projects } from '~/content/projects';

</script>
