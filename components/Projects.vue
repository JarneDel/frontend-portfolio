<template>
  <article class="my-48" id="projects">
    <h2
      class="mb-12 text-3xl font-bold text-gray-900 accent-teal-700 dark:text-gray-100"
    >
      Some projects I've built
    </h2>
    <div class="mb-24 flex w-full flex-col-reverse gap-4 md:flex-row">
      <!--project container-->
      <div class="drop-shadow-xl md:basis-1/2">
        <img
          :src="
            isDark ? 'lol-dark-transparent.png' : 'lol-light-transparent.png'
          "
          alt="LeagueOfStatisticsMockup"
        />
      </div>
      <div
        class="flex max-w-xl basis-1/2 flex-col md:items-end md:justify-center"
      >
        <p class="font-mono text-primary-light dark:text-primary-dark">
          Featured
        </p>
        <h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          League of Statistics
        </h3>
        <p
          class="mb-1 max-w-[32rem] rounded-lg bg-gray-100/30 p-4 shadow-xl dark:bg-gray-900/30 md:text-right"
        >
          League of Statistics is a website that shows you statistics about your
          League of Legends account, per champion you play. You can also view
          champion information and abilities. It was build with
          <strong>micro-interactions</strong> and
          <strong>accessibility</strong> in mind.
        </p>
        <p
          class="mb-2 rounded-lg p-2 font-mono text-sm text-gray-600 dark:text-gray-400"
        >
          HTML, CSS, JS, Node, Azure Functions, CosmosDB, Riot API
        </p>
        <div class="flex gap-4">
          <NuxtLink
            to="https://leagueofstatistics.jarnedel.dev"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <title>External Link</title>
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              ></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://github.com/JarneDel/LolApi"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <title>Github</title>
              <path
                d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66 1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22 2.75 2.75 0 0 1-.41-2.06 3.71 3.71 0 0 0 0-1.41 7.65 7.65 0 0 0-2.09 1.09 1 1 0 0 1-.84.15 10.15 10.15 0 0 0-5.52 0 1 1 0 0 1-.84-.15 7.4 7.4 0 0 0-2.11-1.09 3.52 3.52 0 0 0 0 1.41 2.84 2.84 0 0 1-.43 2.08 4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66 1 1 0 0 1-.21 1 2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09 3.9 3.9 0 0 0-1.16-.88 1 1 0 1 1 .5-1.94 4.93 4.93 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33.85.85 0 0 0 .13-.62 5.69 5.69 0 0 1 .33-3.21 1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57 5.71 5.71 0 0 1 .33 3.22.75.75 0 0 0 .11.57 6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1z"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="mb-24 flex w-full flex-col-reverse gap-4 md:flex-row-reverse">
      <!--project container-->
      <div class="drop-shadow-xl md:basis-1/2">
        <img
          :src="isDark ? 'jj-dark.png' : 'jj-light.png'"
          alt="LeagueOfStatisticsMockup"
        />
      </div>
      <div
        class="flex max-w-xl basis-1/2 flex-col md:items-start md:justify-center"
      >
        <div class="max-w-[32rem]">
          <p class="font-mono text-primary-light">Featured</p>
          <h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Team Project - Jumping Jaws
          </h3>
          <p
            class="mb-1 rounded-lg bg-gray-100/30 p-4 shadow-xl dark:bg-gray-900/30"
          >
            Jumping Jaws is a co-op game where you have steer a boat through a
            river full of obstacles. You have to avoid the obstacles by jumping
            on a trampoline. If the left player jumps on the trampoline, the
            boat will move to the left and vice versa. The jump tracking was
            done with an Xbox Kinect 2. There are 2 buttons, to navigate through
            the menus. We were fortunate enough to present our game to the
            public at Facts gent 2023
          </p>
          <p
            class="mb-2 rounded-lg p-2 font-mono text-sm text-gray-600 dark:text-gray-400"
          >
            C#, Unity, Xbox Kinect 2, NodeJs, Express, MySql, Websockets,
            ESP-32, C++, Serial communication, Scrum, Agile,
          </p>
          <div class="flex gap-4">
            <a
              href="/documents/FunctionalAnalysis.pdf"
              class="hocus:text-primary-light hocus:dark:text-primary-dark"
              download
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 96 960 960"
                width="24"
                fill="currentColor"
              >
                <title>Functional Analysis</title>
                <path
                  d="M319 806h322v-60H319v60Zm0-170h322v-60H319v60Zm-99 340q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z"
                />
              </svg>
            </a>
            <a
              href="/documents/DesignDocument.pdf"
              class="hocus:text-primary-light hocus:dark:text-primary-dark"
              download
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 96 960 960"
                width="24"
                fill="currentColor"
              >
                <title>Design Document</title>
                <path
                  d="M560 936q-12 0-21-9t-9-21q0-13 9-21.5t21-8.5q59 0 99.5-24t40.5-56q0-23-29.5-45T591 717l47-47q63 19 92.5 52.5T760 796q0 67-61 103.5T560 936ZM240 642q-64-14-92-44t-28-62q0-35 26-63t120-62q66-24 85-39t19-35q0-25-22-43t-68-18q-27 0-46 7t-34 22q-8 8-20.5 9.5T157 308q-11-8-11.5-20t7.5-21q17-22 51-36.5t76-14.5q68 0 109 32.5t41 88.5q0 41-28.5 69.5T290 466q-67 25-88.5 39.5T180 536q0 16 27 30.5t81 27.5l-48 48Zm496-154L608 360l45-45q18-18 40-18t40 18l48 48q18 18 18 40t-18 40l-45 45ZM220 876h42l345-345-42-42-345 345v42Zm-60 60V808l405-405 128 128-405 405H160Zm405-447 42 42-42-42Z"
                />
              </svg>
            </a>
            <NuxtLink
              to="https://github.com/DauweQuinten/Trampoline_Groep2_FrontEnd"
              class="hocus:text-primary-light hocus:dark:text-primary-dark"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <title>Github</title>
                <path
                  d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66 1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22 2.75 2.75 0 0 1-.41-2.06 3.71 3.71 0 0 0 0-1.41 7.65 7.65 0 0 0-2.09 1.09 1 1 0 0 1-.84.15 10.15 10.15 0 0 0-5.52 0 1 1 0 0 1-.84-.15 7.4 7.4 0 0 0-2.11-1.09 3.52 3.52 0 0 0 0 1.41 2.84 2.84 0 0 1-.43 2.08 4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66 1 1 0 0 1-.21 1 2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09 3.9 3.9 0 0 0-1.16-.88 1 1 0 1 1 .5-1.94 4.93 4.93 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33.85.85 0 0 0 .13-.62 5.69 5.69 0 0 1 .33-3.21 1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57 5.71 5.71 0 0 1 .33 3.22.75.75 0 0 0 .11.57 6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1z"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-24 flex w-full flex-col-reverse gap-4 md:flex-row">
      <!--project container-->
      <div class="drop-shadow-xl md:basis-1/2">
        <img
          :src="
            isDark ? 'lol-dark-transparent.png' : 'lol-light-transparent.png'
          "
          alt="LeagueOfStatisticsMockup"
        />
      </div>
      <div
        class="flex max-w-xl basis-1/2 flex-col md:items-end md:justify-center"
      >
        <p class="font-mono text-primary-light dark:text-primary-dark">
          Featured
        </p>
        <h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Air insight - Digital air quality monitor
        </h3>
        <p
          class="mb-1 max-w-[32rem] rounded-lg bg-gray-100/30 p-4 shadow-xl dark:bg-gray-900/30 md:text-right"
        >
          Air Insight is a digital air quality monitor that can be used to
          monitor the air quality in your home or office. It is a project that I
          made for my "Project One" at school.
        </p>
        <p
          class="mb-2 rounded-lg p-2 font-mono text-sm text-gray-600 dark:text-gray-400"
        >
          HTML CSS JavaScript Socket.io MySQL Python Flask Raspberry Pi
        </p>
        <div class="flex gap-4">
          <NuxtLink
            to="https://www.instructables.com/Air-Insight-Air-Quality-Monitor-With-Raspberry-Pi/"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <title>Instructabels</title>
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              ></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </NuxtLink>
          <NuxtLink
            to="https://github.com/howest-mct/2021-2022-projectone-JarneDel"
            class="hocus:text-primary-light hocus:dark:text-primary-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <title>Github</title>
              <path
                d="M16.24 22a1 1 0 0 1-1-1v-2.6a2.15 2.15 0 0 0-.54-1.66 1 1 0 0 1 .61-1.67C17.75 14.78 20 14 20 9.77a4 4 0 0 0-.67-2.22 2.75 2.75 0 0 1-.41-2.06 3.71 3.71 0 0 0 0-1.41 7.65 7.65 0 0 0-2.09 1.09 1 1 0 0 1-.84.15 10.15 10.15 0 0 0-5.52 0 1 1 0 0 1-.84-.15 7.4 7.4 0 0 0-2.11-1.09 3.52 3.52 0 0 0 0 1.41 2.84 2.84 0 0 1-.43 2.08 4.07 4.07 0 0 0-.67 2.23c0 3.89 1.88 4.93 4.7 5.29a1 1 0 0 1 .82.66 1 1 0 0 1-.21 1 2.06 2.06 0 0 0-.55 1.56V21a1 1 0 0 1-2 0v-.57a6 6 0 0 1-5.27-2.09 3.9 3.9 0 0 0-1.16-.88 1 1 0 1 1 .5-1.94 4.93 4.93 0 0 1 2 1.36c1 1 2 1.88 3.9 1.52a3.89 3.89 0 0 1 .23-1.58c-2.06-.52-5-2-5-7a6 6 0 0 1 1-3.33.85.85 0 0 0 .13-.62 5.69 5.69 0 0 1 .33-3.21 1 1 0 0 1 .63-.57c.34-.1 1.56-.3 3.87 1.2a12.16 12.16 0 0 1 5.69 0c2.31-1.5 3.53-1.31 3.86-1.2a1 1 0 0 1 .63.57 5.71 5.71 0 0 1 .33 3.22.75.75 0 0 0 .11.57 6 6 0 0 1 1 3.34c0 5.07-2.92 6.54-5 7a4.28 4.28 0 0 1 .22 1.67V21a1 1 0 0 1-.94 1z"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>
