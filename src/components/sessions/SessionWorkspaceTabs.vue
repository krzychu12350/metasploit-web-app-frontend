<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        @change="test($event)"
      >
        <option
          v-for="(tab, index) in tabs"
          :key="index"
          :id="index"
          :value="index"
          :selected="tab.name"
        >
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a
            v-for="(tab, index) in tabs"
            :key="index"
            :href="tab.href"
            @click="changeCurrentTab(tab, index)"
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
import {
  InformationCircleIcon,
  FolderIcon,
  GlobeAltIcon,
  WindowIcon,
  PowerIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/solid";
import useEventsBus from "../../composables/eventBus";
import { reactive, onMounted } from "vue";

const tabs = reactive([
  { name: "System Info", href: "#", icon: InformationCircleIcon, current: false },
  { name: "Network", href: "#", icon: GlobeAltIcon, current: false },
  { name: "File System", href: "#", icon: FolderIcon, current: false },
  { name: "User Interface", href: "#", icon: WindowIcon, current: false },
  { name: "Processes", href: "#", icon: Cog6ToothIcon, current: false },
  { name: "Power", href: "#", icon: PowerIcon, current: false },
]);

onMounted(() => {
  tabs[0].current = true;
});

function test(e) {
  console.log(e.target.value);
  tabs.map((t) => {
    t.current = false;
  });
  tabs[e.target.value].current = true;

  emit("setActiveTab", { tab_name: tabs[e.target.value].name.replace(/\s/g, "") });
}
const { emit } = useEventsBus();

function changeCurrentTab(tab, index) {
  tabs.map((t) => {
    t.current = false;
  });
  tabs[index].current = true;

  emit("setActiveTab", { tab_name: tab.name.replace(/\s/g, "") });
}
</script>
