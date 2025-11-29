<template>
  <section class="py-6" id="projects">

      <!-- Bento Grid -->
      <div class="projects-masonry">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :class="getProjectItemClass(project)"
          v-motion="{
            initial: { opacity: 0, scale: 0.95 },
            visibleOnce: {
              opacity: 1,
              scale: 1,
              transition: { delay: index * 0.1 },
            },
          }"
        >
          <article
              class="flex flex-col overflow-hidden transition-all duration-300 bg-background-dark-300 shadow-lg group rounded-2xl hover:shadow-2xl border border-background-dark-400"
            :class="
              project.category === 'Favourite'
                ? 'ring-primary-dark ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900'
                : ''
            "
          >
            <!-- Project Image -->
            <div class="relative overflow-hidden">
              <BaseImage
                :src="project.image"
                :alt="project.imageAlt"
                :height="project.category === 'Favourite' ? 375 : 158"
                :width="project.category === 'Favourite' ? 600 : 281"
              
                class="object-cover object-top w-full transition-transform duration-500 group-hover:scale-105"
                :style="{
                  transformOrigin: project.transformOrigin || 'center top',
                  aspectRatio:
                    project.category === 'Favourite' ? '16/10' : '16/9',
                }"
                loading="lazy"
              />

              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span
                  class="inline-flex items-center px-3 py-1 text-xs font-semibold transition-all duration-300 rounded-full backdrop-blur-md"
                  :class="getCategoryClass(project.category)"
                >
                  {{ project.category }}
                </span>
              </div>
                <div class="absolute top-4 left-4">
                  <span
                    class="inline-flex items-center px-3 py-1 text-xs font-semibold transition-all duration-300 rounded-full"
                    :class="getCategoryClass(project.category)"
                  >
                    {{ project.category }}
                  </span>
                </div>
            </div>

            <!-- Content -->
            <div class="flex flex-col p-6">
              <!-- Project Info -->
              <div class="mb-4">
                <h3
                  class="mb-3 text-xl font-bold leading-tight text-white"
                >
                  {{ project.title }}
                </h3>

                <p
                  class="mb-4 text-sm text-background-light-500"
                  :class="
                    project.category === 'Favourite'
                      ? 'line-clamp-4'
                      : 'line-clamp-3'
                  "
                >
                  {{ project.description }}
                </p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="tech in project.technologies.split(' ').slice(0, 4)"
                    :key="tech"
                      class="px-2 py-1 text-xs font-medium text-background-light-500 bg-background-dark-500 rounded-md"
                  >
                    {{ tech }}
                  </span>
                  <span
                    v-if="project.technologies.split(' ').length > 4"
                      class="px-2 py-1 text-xs font-medium text-background-light-500 bg-background-dark-500 rounded-md"
                  >
                    +{{ project.technologies.split(' ').length - 4 }} more
                  </span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap items-center gap-3">
                <a
                  v-if="project.external"
                  :href="project.external"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-lg bg-primary-dark hover:bg-primary-light hover:shadow-lg"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {{ project.externalTitle || 'View Live' }}
                </a>

                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-background-dark-500 border border-background-dark-400 rounded-lg hover:bg-background-dark-400"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
              
                </a>
              </div>

              <!-- Document Links -->
              <div
                v-if="
                  project.designDocument ||
                  project.functionalAnalysis ||
                  project.technicalAnalysis
                "
                class="flex flex-wrap gap-3 mt-3"
              >
                <a
                  v-if="project.designDocument"
                  :href="project.designDocument"
                  target="_blank"
                    class="text-xs text-background-light-500 hover:text-primary-dark underline-offset-2 hover:underline"
                >
                  Design Doc
                </a>
                <a
                  v-if="project.functionalAnalysis"
                  :href="project.functionalAnalysis"
                  target="_blank"
                    class="text-xs text-background-light-500 hover:text-primary-dark underline-offset-2 hover:underline"
                >
                  Functional Analysis
                </a>
                <a
                  v-if="project.technicalAnalysis"
                  :href="project.technicalAnalysis"
                  target="_blank"
                    class="text-xs text-background-light-500 hover:text-primary-dark underline-offset-2 hover:underline"
                >
                  Technical Analysis
                </a>
              </div>
            </div>
          </article>
        </div>
    
      </div>
  </section>
</template>

<script setup lang="ts">
// Import the projects data from your file
import {
  projectOthers,
  projects,
  type IFeaturedProject,
} from '~/content/projects'

// Function to determine item classes based on project properties
function getProjectItemClass(project: IFeaturedProject) {
  const baseClasses = []

  // Make favorite projects larger
  if (project.category === 'Favourite') {
    baseClasses.push('favourite-item')
  }

  if (project.category === 'Professional') {
    baseClasses.push('professional-item')
  }

  return baseClasses.join(' ')
}

// Function to get category badge styling
function getCategoryClass(category: string) {
  switch (category) {
    case 'Favourite':
      return 'bg-gradient-to-r from-yellow-400/80 to-orange-400/80 text-white'
    case 'Featured':
      return 'bg-white/20 text-white'
    default:
      return 'bg-gray-500/20 text-gray-200'
  }
}

const getProjectClasses = (index: number): string => {
  // Project 3 (index 2) spans two rows
  // if (index === 2) {
  //   return 'lg:row-span-2'
  // }
  // // Project 4 (index 3) spans two columns
  // if (index === 3) {
  //   return 'md:col-span-2'
  // }
  return ''
}

// Function to check for masonry support and fallback
function isMasonrySupported() {
  return CSS.supports('grid-template-rows', 'masonry');
}

onMounted(() => {
  if (!isMasonrySupported()) {
    const items = document.querySelectorAll('.projects-masonry > div');
    items.forEach((item) => {
      (item as HTMLElement).style.height = '100%';
      (item as HTMLElement).style.display = 'flex';
    });
  }
});
</script>

<style scoped>
/* Three column grid layout */
.projects-masonry {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
  grid-template-rows: masonry;
  break-inside: avoid;
  page-break-inside: avoid;
}

/* Responsive grid adjustments */
@media (min-width: 640px) {
  .projects-masonry {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.75rem;
  }
}

@media (min-width: 1024px) {
  .projects-masonry {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

/* Special sizing for favourite projects */
@media (min-width: 1024px) {
  .favourite-item {
    grid-column: span 2;
  }
}

/* Responsive image aspect ratios */
.favourite-item img {
  aspect-ratio: 16/9;
}

@media (min-width: 1024px) {
  .favourite-item img {
    aspect-ratio: 20/9;
  }
}

/* Professional projects get slightly taller images */
.professional-item img {
  aspect-ratio: 16/10;
}

/* Ensure cards have natural heights */
.projects-masonry > div > article {
  height: auto;
  display: flex;
  flex-direction: column;
}

/* Better content distribution */
.projects-masonry .group {
  break-inside: avoid;
  page-break-inside: avoid;
}

/* Custom line clamp utilities */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Improved hover effects */
.group:hover {
  transform: translateY(-2px);
}

/* Better shadow transitions */
.group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Dark mode shadow adjustments */
.dark .group:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.25),
    0 10px 10px -5px rgba(0, 0, 0, 0.1);
}
</style>
