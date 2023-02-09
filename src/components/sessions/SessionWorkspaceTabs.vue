<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.name">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.href"
            @click="changeCurrentTab(tab.name)"
            :class="[
              tab.current
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            <component
              :is="tab.icon"
              :class="[
                tab.current
                  ? 'text-indigo-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                '-ml-0.5 mr-2 h-5 w-5',
              ]"
              aria-hidden="true"
            />
            <span>{{ tab.name }}</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InformationCircleIcon, UserIcon, UsersIcon } from "@heroicons/vue/24/solid";
import useEventsBus from "../../composables/eventBus";

const tabs = [
  { name: "System Info", href: "#", icon: InformationCircleIcon, current: false },
  { name: "Network", href: "#", icon: InformationCircleIcon, current: false },
  { name: "File System", href: "#", icon: InformationCircleIcon, current: true },
  { name: "User Interface", href: "#", icon: InformationCircleIcon, current: false },
];

const { emit } = useEventsBus();

function changeCurrentTab(tabName) {
  emit("setActiveTab", { tab_name: tabName.replace(/\s/g, "") });
}
</script>
