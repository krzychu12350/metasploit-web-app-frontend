<template>
  <input type="text" v-model="search" />
  <p v-if="noResults">Sorry, no results for {{ search }}</p>
  <div v-for="(r, i) in results" :key="i">
    {{ r }}
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useVueFuse } from "vue-fuse";
import ModuleDataService from "../../services/ModuleDataService";

const modules = ref([]);
const myList = ["aaaa", "bbbb", "cccc", "abc", "xyz"];
const { search, results, noResults } = useVueFuse(modules);

async function getAllExploits() {
  return ModuleDataService.payloads()
    .then(async (res) => {
      modules.value = await res.data.data.modules;
      console.log(modules);
    })
    .catch((error) => {
      console.log(error);
    });
}

onBeforeMount(() => {
  getAllExploits();
});
/*
export default defineComponent({
  setup() {
    const myList = ["aaaa", "bbbb", "cccc", "abc", "xyz"];
    const { search, results, noResults } = useVueFuse(myList);

    return {
      search,
      results,
      noResults,
    };
  },
});
*/
</script>
