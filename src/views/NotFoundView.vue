<template>
  <div class="container min-h-full min-w-full pt-16 pb-12 flex flex-col bg-white">
    <main
      class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="flex-shrink-0 flex justify-center">
        <a href="/" class="inline-flex">
          <span class="sr-only">Metasploit</span>
          <img class="h-12 w-auto" src="/logo.svg" alt="" />
        </a>
      </div>
      <div class="py-16">
        <div class="text-center">
          <p class="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            404 error
          </p>
          <h1
            class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
          >
            Page not found.
          </h1>
          <p class="mt-2 text-base text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div class="mt-6">
            <router-link
              to="/"
              class="text-base font-medium text-gray-900 hover:text-gray-500"
              >Go back home<span aria-hidden="true"> &rarr;</span></router-link
            >
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
