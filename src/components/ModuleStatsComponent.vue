<template>
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
import { inject, ref, onMounted, reactive } from "vue";
import CoreService from "../services/CoreDataService";

onMounted(() => {
  getMsfModuleStats();
});
let moduleStats = ref([]);
const $loading = inject("$loading");

async function getMsfModuleStats() {
  const loader = $loading.show();
  CoreService.moduleStats()
    .then((response) => {
      const data = response.data.data;
      const allStats = [];
      Object.keys(data).forEach((key) => {
        let val = data[key];

        const singleStat = { name: key, number: val };
        allStats.push(singleStat);
      });
      moduleStats.value = allStats;
      loader.hide();
    })
    .catch((err) => {
      loader.hide();
      console.log(err.response.data);
    });
}
</script>
