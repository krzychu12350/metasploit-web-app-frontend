<template>
  <div class="sm:flex-auto mb-6">
    <h1 class="text-xl font-semibold text-gray-900">Modules</h1>
    <p class="mt-2 text-sm text-gray-700">A list of modules you can run</p>
  </div>

  <div class="relative text-gray-600 focus-within:text-gray-400 mb-4 md:rounded-lg">
    <span class="absolute inset-y-0 left-0 flex items-center">
      <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
        <MagnifyingGlassIcon class="flex-shrink-0 h-5 w-5 mr-2 text-gray-400 ml-2" />
      </button>
    </span>
    <input
      type="text"
      class="h-12 w-full border-0 pl-11 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-0 md:rounded-lg"
      placeholder="Search module..."
      v-model="search"
      @input="onInput"
    />
  </div>

  <p v-if="noResults" class="mt-2 text-sm text-gray-700 mb-4 text-red-600 font-semibold">
    Sorry, no results for {{ search }}
  </p>
  <!--
  {{ filteredItems.length }}
  {{ result }}
  -->
  <div class="shadow sm:rounded-lg">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden border-b border-gray-200 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Full name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    License
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Stance
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(module, index) in modulesDetails"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ module.type }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ module.fullname }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ module.rank }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ module.license }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ module.stance }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ module.name }}
                  </td>

                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex"
                  >
                    <ChevronDoubleRightIcon
                      @click="emit('showRunModuleModal', { module_data: module })"
                      class="w-5 h-5 cursor-pointer text-indigo-500"
                    ></ChevronDoubleRightIcon>

                    <EyeIcon
                      @click="emit('showModuleDetailsModal', { module_data: module })"
                      class="w-5 h-5 cursor-pointer text-indigo-500"
                    ></EyeIcon>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav
              class="bg-white px-4 py-3 flex items-center justify-between sm:px-6"
              aria-label="Pagination"
            >
              <div class="hidden sm:block">
                <p class="text-sm text-gray-700">
                  Page
                  {{ " " }}
                  <span class="font-medium">{{ currentPage }}</span>
                  {{ " " }}
                  of
                  {{ " " }}
                  <span class="font-medium">{{ lastPage }}</span>
                </p>
              </div>
              <div class="flex-1 flex justify-between sm:justify-end">
                <button
                  @click="goToPrevPage()"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="goToNextPage()"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--
  <div>
    <p>page {{ currentPage }} of {{ lastPage }}</p>
    <p>
      <button @click="prev">prev</button>
      <button @click="next">next</button>
    </p>
    <ul>
      <li v-for="n in result" :key="n">
        {{ n.module_name }}
      </li>
    </ul>
  </div>
  -->
  <ModuleDetailsModalComponent></ModuleDetailsModalComponent>
  <run-module-modal-component></run-module-modal-component>
  <payload-configuration-modal-component></payload-configuration-modal-component>
</template>

<script setup>
import { computed, ref, watch, onBeforeMount, reactive, onMounted, inject } from "vue";
import ModuleDataService from "../../services/ModuleDataService";
import ModuleDetailsModalComponent from "./ModuleDetailsModalComponent.vue";
import RunModuleModalComponent from "./RunModuleModalComponent.vue";
import PayloadConfigurationModalComponent from "./PayloadConfigurationModalComponent.vue";
import { useArrayPagination } from "vue-composable";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/solid";
import { useVueFuse } from "vue-fuse";
import { useMsfModules } from "../../stores/useMsfModules";
import useEventsBus from "../../composables/eventBus";
import debounce from "lodash.debounce";

let modules = ref([]);
let modulesDetails = ref([]);
const $loading = inject("$loading");
const useMetasploitModules = useMsfModules();
const { emit } = useEventsBus();

const { search, results, noResults } = useVueFuse(modules, {
  keys: [{ name: "module_name", weight: 1 }],
  includeScore: true,
  threshold: 0.0,
});

const filteredItems = computed(() => {
  if (search.value != "") {
    return modules.value.filter((module) => {
      return module.module_name.toLowerCase().indexOf(search.value.toLowerCase()) > -1;
    });
  } else {
    return modules.value;
  }
});

const { result, next, prev, currentPage, lastPage } = useArrayPagination(filteredItems, {
  pageSize: 5,
});

const searchedModules = ref(results);
/*
async function getModuleDetails2(module) {
  const test = await ModuleDataService.info(module)
    .then((res) => {
      //activeModuleDetails = res.data.data;
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(test);
  activeModuleDetails.value = test;
  return test;
}
*/

onBeforeMount(async () => {
  /*
  const exploits = await getAllExploits();
  const payloads = await getAllPayloads();
  const auxiliaries = await getAllAuxiliaries();
  const posts = await getAllPosts();

  modules.value = modules.value.concat(exploits, payloads, auxiliaries, posts);
  console.log(modules.value);

  prev();

  console.log(modulesDetails.value);
  */
  //alert("test");
  //await msfModules.fetchAllModules();

  modules.value = await useMetasploitModules.getMsfModules;
  //console.log(modules.value);

  //console.log(result.value);
  goToPrevPage();
  //
  // await getCurrentPaginateModulesDetails(modules.value);
});

async function getModuleDetails(module) {
  //console.log(module);
  /*
  const data = {
    module_type: "payload",
    module_name: moduleName,
  };
*/
  const loader = $loading.show();
  return await ModuleDataService.info(module)
    .then((res) => {
      //activeModuleDetails = res.data.data;
      //console.log(res.data.data);
      loader.hide();
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
  //loader.hide();
}

async function getCurrentPaginateModulesDetails(currentModules) {
  //console.log(currentModules);

  modulesDetails.value.splice(0);
  currentModules.forEach(async (module, i) => {
    let moduleWithDetails = await getModuleDetails(module);

    //result.value[i] = moduleWithDetails;
    modulesDetails.value.push(moduleWithDetails);
  });

  return modulesDetails.value;
}
/*
watch(result, async (currentModules, oldModules) => {
  //console.log(currentModules);
  //console.log(oldModules);
  //setTimeout(async () => await getCurrentPaginateModulesDetails(currentModules), 800);
});
*/
const onInput = debounce(() => {
  console.log("debug");
  console.log(result.value);
  getCurrentPaginateModulesDetails(result.value);
}, 1000);

function goToPrevPage() {
  prev();
  onInput();
}

function goToNextPage() {
  next();
  onInput();
}

/*
watch(
  result,
  debounce((currentModules, oldModules) => {
    //console.log(currentModules);
    console.log("Send API request");
    console.log(result.value);

    //await getCurrentPaginateModulesDetails(result.value);
    // await getCurrentPaginateModulesDetails(result.value);
  }),
  2000
);
*/
/*
watch(results, async (currentModules, oldModules) => {
  console.log(currentModules);
  //modules.value = currentModules;
  //console.log(oldModules);
  //if (currentModules.length > 0) modules.value = currentModules;
});
*/
</script>
