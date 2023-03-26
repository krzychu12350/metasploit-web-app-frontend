<template>
  <nav class="bg-white border-b border-gray-200 flex" aria-label="Breadcrumb">
    <ol
      role="list"
      class="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8"
    >
      <li class="flex">
        <div class="flex items-center">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="flex-shrink-0 h-5 w-5" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li class="flex">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-6 h-full text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{
            toPascalCase(currentWorkspace)
          }}</a>
        </div>
      </li>
      <li class="flex">
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-6 h-full text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{{
            subpageName
          }}</a>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { HomeIcon } from "@heroicons/vue/24/solid";
import { useMsfCurrentWorkspace } from "../stores/useMsfCurrentWorkspace";
import useEventsBus from "../composables/eventBus";

const useMsfWorkspace = useMsfCurrentWorkspace();
const pages = [
  { name: "Sessions", href: "#", current: false },
  { name: "Session 1", href: "#", current: true },
];

const props = defineProps({
  subpageName: String,
});

const currentWorkspace = ref("");
const { bus, emit } = useEventsBus();

onBeforeMount(async () => {
  emit("setCurrentWorkspace");
});

watch(
  () => bus.value.get("setCurrentWorkspace"),
  async () => {
    currentWorkspace.value = useMsfWorkspace.getCurrentWorkspace;
  }
);

const toPascalCase = (str) =>
  (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join("");
</script>

<style scoped></style>
