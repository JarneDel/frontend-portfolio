<style scoped lang="scss">
article {
  display: flex;
  max-width: 72rem;
  flex-direction: column;
  gap: 4rem;
  padding-block: 3rem;
  @media (min-width: 768px) {
    padding-block: 12rem;
  }
}

.about-header {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}

.about {
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-basis: 60%;
  }
  h2 {
    margin-bottom: 1rem;
    width: 100%;
    max-width: 32rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: #111827ff;
    @media (prefers-color-scheme: dark) {
      color: #f3f4f6;
    }
  }
}

.cv-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
}

.skills-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-group {
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
    @media (prefers-color-scheme: dark) {
      color: #f3f4f6;
    }
  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  li {
    background: #e5e7eb;
    padding: 0.25rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #374151;
    @media (prefers-color-scheme: dark) {
      background: #374151;
      color: #d1d5db;
    }
  }
}

.experience-column {
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1rem;
    @media (prefers-color-scheme: dark) {
      color: #f3f4f6;
    }
  }
}

.job {
  h4 {
    font-weight: 600;
    color: #111827;
    @media (prefers-color-scheme: dark) {
      color: #f3f4f6;
    }
  }
  .date {
    font-size: 0.875rem;
    color: #6b7280;
  }
  ul {
    margin-top: 0.75rem;
    padding-left: 1.25rem;
    li {
      color: #4b5563;
      margin-bottom: 0.5rem;
      @media (prefers-color-scheme: dark) {
        color: #9ca3af;
      }
    }
  }
}
</style>

<template>
  <article id="about">
    <div class="about-header">
      <div class="about">
        <h2
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: { opacity: 1, y: 0, transition: { delay: 0.5 } },
            visibleOnce: { opacity: 1, y: 0 },
          }"
        >
          About me
        </h2>
        <p
          class="mb-4 max-w-[32rem] leading-relaxed text-gray-600 md:text-lg dark:text-gray-400"
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: { opacity: 1, y: 0, transition: { delay: 0.6 } },
            visibleOnce: { opacity: 1, y: 0 },
          }"
        >
          Full-Stack Web Developer with focus on <strong>Umbraco</strong> and
          <strong>Vue</strong>. Strong in both frontend and backend, with
          experience in cloud deployments, CI/CD and building accessible,
          performant websites.
        </p>
        <p
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: { opacity: 1, y: 0, transition: { delay: 0.7 } },
            visibleOnce: { opacity: 1, y: 0 },
          }"
          class="mb-4 max-w-[32rem] leading-relaxed text-gray-600 md:text-lg dark:text-gray-400"
        >
          Based in <strong>Ghent, Belgium</strong>. Eager to learn, quick to
          deploy and driven to solve complex technical challenges.
        </p>
      </div>

      <div
        v-motion="{
          initial: { opacity: 0, y: 80 },
          enter: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.8,
              type: 'spring',
              stiffness: 250,
              damping: 20,
              mass: 5,
            },
          },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        class="img flex p-2 md:justify-center lg:basis-2/5"
      >
        <NoiseImage
          src="/images/profile.webp"
          alt="Profile"
          width-px="300px"
          height-px="300px"
          width="300px"
          aspect-ratio="1"
          class="rounded-lg shadow-lg"
          :zoom-scale="1.05"
        />
      </div>
    </div>

    <div class="cv-section">
      <div class="skills-column">
        <div class="skill-group">
          <h3>Backend</h3>
          <ul>
            <li>Umbraco</li>
            <li>.NET</li>
          </ul>
        </div>
        <div class="skill-group">
          <h3>Frontend</h3>
          <ul>
            <li>Vue / Nuxt</li>
            <li>React / NextJS</li>
            <li>TypeScript</li>
            <li>TailwindCSS</li>
          </ul>
        </div>
        <div class="skill-group">
          <h3>Cloud & DevOps</h3>
          <ul>
            <li>Microsoft Azure</li>
            <li>Azure AI Search</li>
            <li>Docker</li>
            <li>Kubernetes</li>
            <li>GitHub Actions</li>
            <li>Azure Pipelines</li>
          </ul>
        </div>
        <div class="skill-group">
          <h3>Databases</h3>
          <ul>
            <li>SQL</li>
            <li>Entity Framework</li>
            <li>MongoDB</li>
          </ul>
        </div>
      </div>

      <div class="experience-column">
        <h3>Experience</h3>
        <div class="job">
          <h4>Numble, Ghent — Junior Full Stack Umbraco Developer</h4>
          <span class="date">08/2024 - Present</span>
          <ul>
            <li>
              Core developer for large-scale content platforms like Buildwise
              and mil.be
            </li>
            <li>
              Initiated migration to TypeScript + Vite, leading to a more robust
              codebase and faster load times
            </li>
            <li>
              Focus on technical optimization (Core Web Vitals) and WCAG
              accessibility compliance
            </li>
            <li>
              Developing custom integrations with Azure AI Search, Cookiebot,
              Twilio and CRM packages
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts"></script>
