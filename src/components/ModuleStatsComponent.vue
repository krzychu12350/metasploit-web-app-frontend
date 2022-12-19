<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
      Modules Statistics
    </h2>
    <ul
      role="list"
      class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <li v-for="moduleStat in moduleStats" class="col-span-1 flex shadow-sm rounded-md">
        <div
          :class="[
            'bg-gray-800 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md',
          ]"
        >
          <!--{{ project.initials }}-->
          {{ moduleStat.name.slice(0, 2).toUpperCase() }}
        </div>
        <div
          class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
        >
          <div class="flex-1 px-4 py-2 text-sm truncate">
            <a
              :href="moduleStat.name"
              class="text-gray-900 font-medium hover:text-gray-600"
              >{{ moduleStat.name }}</a
            >
            <p class="text-gray-500">{{ moduleStat.number }} Number</p>
          </div>
          <div class="flex-shrink-0 pr-2">
            <button
              type="button"
              class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">Open options</span>
              <!--<DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />-->
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
//import { DotsVerticalIcon } from "@heroicons/vue/24/solid";
import { defineComponent } from "vue";
import CoreService from "../services/CoreService";
import ModuleStat from "../types/Core";

const projects = [
  { name: "Graph API", initials: "GA", href: "#", members: 16, bgColor: "bg-pink-600" },
  {
    name: "Component Design",
    initials: "CD",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  { name: "Templates", initials: "T", href: "#", members: 16, bgColor: "bg-yellow-500" },
  {
    name: "React Components",
    initials: "RC",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

export default defineComponent({
  components: {
    // DotsVerticalIcon,
  },
  setup() {
    //console.log(CoreService.moduleStats());
    return {
      projects,
    };
  },
  data() {
    return {
      moduleStats: [] as any[],
    };
  },
  mounted() {
    this.getMsfModuleStats();
  },
  methods: {
    async getMsfModuleStats() {
      CoreService.moduleStats()
        .then((response) => {
          //this.moduleStats = response.data.data;
          //console.log(response.data.data);
          const data = response.data.data;
          //console.log(data);

          //console.log(Object.keys(this.moduleStats));
          //console.log(Object.values(this.moduleStats));
          const allStats: {
            //import { DotsVerticalIcon } from "@heroicons/vue/24/solid";
            name: string;
            number: any;
          }[] = [];
          Object.keys(data).forEach((key) => {
            let val = data[key]; // value of the current key
            //console.log(key);
            //console.log(val);
            const singleStat = { name: key, number: val };
            allStats.push(singleStat);
          });
          this.moduleStats = allStats;
          //console.log(allStats);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
</script>
