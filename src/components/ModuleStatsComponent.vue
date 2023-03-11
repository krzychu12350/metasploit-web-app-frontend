<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!--
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
             <DotsVerticalIcon class="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  -->
  <div>
    <h2 class="text-xl leading-6 font-semibold text-gray-900">Modules Statistics</h2>
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div
        v-for="(stat, index) in moduleStats"
        :key="stat.index"
        class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
      >
        <dt class="text-sm font-medium text-gray-500 truncate">
          {{ stat.name.toUpperCase() }}
        </dt>
        <dd class="mt-1 text-xl font-semibold text-gray-900">
          {{ stat.number }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
//import { DotsVerticalIcon } from "@heroicons/vue/24/solid";
import { ref, onMounted, reactive } from "vue";
import CoreService from "../services/CoreDataService";

onMounted(() => {
  getMsfModuleStats();
});
let moduleStats = ref([]);

async function getMsfModuleStats() {
  CoreService.moduleStats()
    .then((response) => {
      //this.moduleStats = response.data.data;
      //console.log(response.data.data);
      const data = response.data.data;
      //console.log(data);

      //console.log(Object.keys(this.moduleStats));
      //console.log(Object.values(this.moduleStats));
      /*
          const allStats: {
            //import { DotsVerticalIcon } from "@heroicons/vue/24/solid";
            name: string;
            number: any;
          }[] = [];
          */
      const allStats = [];
      Object.keys(data).forEach((key) => {
        let val = data[key]; // value of the current key
        //console.log(key);
        //console.log(val);
        const singleStat = { name: key, number: val };
        allStats.push(singleStat);
      });
      moduleStats.value = allStats;
      //console.log(allStats);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

/*
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
*/
</script>
