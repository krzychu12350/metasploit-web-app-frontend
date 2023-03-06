<template>
  <TransitionRoot as="template" :show="open" @after-leave="query = ''">
    <Dialog
      as="div"
      class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
      @close="open = false"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay
          class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"
        />
      </TransitionChild>

      <TransitionChild
        as="div"
        enter="ease-out duration-300"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <Combobox
          as="div"
          class="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
          v-slot="{ activeOption }"
        >
          <div class="relative">
            <MagnifyingGlassIcon
              class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />

            <input
              type="text"
              class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-0"
              placeholder="Search..."
              v-model="search"
            />

            <p v-if="noResults">Sorry, no results for {{ search }}</p>
          </div>
          <!--<button @click="toggleSearchBox()">Deactivate</button>-->
          <div v-if="query === '' || results > 0" class="flex divide-x divide-gray-100">
            <div
              :class="[
                'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                activeOption && 'sm:h-96',
              ]"
            >
              <h2
                v-if="query === ''"
                class="mt-2 mb-4 text-xs font-semibold text-gray-500"
              >
                Recent searches
              </h2>
              <ComboboxOptions static hold class="-mx-2 text-sm text-gray-700">
                <ComboboxOption
                  v-for="(module, i) in results.slice(0, 9)"
                  :key="i"
                  :value="module"
                  as="template"
                  v-slot="{ active }"
                >
                  <li
                    :class="[
                      'group flex cursor-default select-none items-center rounded-md p-2',
                      active && 'bg-gray-100 text-gray-900 cursor-pointer',
                    ]"
                    @click="test(module)"
                  >
                    <span class="ml-3 flex-auto truncate">{{ module.module_name }} </span>
                    <ChevronRightIcon
                      v-if="active"
                      class="ml-3 h-5 w-5 flex-none text-gray-400"
                      aria-hidden="true"
                    />
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </div>

            <div
              v-if="activeOption"
              class="hidden h-96 w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex"
            >
              <div class="flex-none p-6 text-center">
                <h2 class="mt-3 font-semibold text-gray-900">
                  {{ activeModuleDetails.name }}
                </h2>
                <p class="text-sm leading-6 text-gray-500">
                  {{ activeModuleDetails.description }}
                </p>
              </div>
              <div class="flex flex-auto flex-col justify-between p-6">
                <dl class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                  <dt class="col-end-1 font-semibold text-gray-900">Type</dt>
                  <dd>{{ activeModuleDetails.type }}</dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Full name</dt>
                  <dd class="truncate">
                    {{ activeModuleDetails.fullname }}
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">License</dt>
                  <dd class="truncate">
                    {{ activeModuleDetails.license }}
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Rank</dt>
                  <dd class="truncate">
                    {{ activeModuleDetails.rank }}
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Arch</dt>
                  <dd class="truncate">
                    <span v-for="arch in activeModuleDetails.arch">
                      {{ arch }} <br />
                    </span>
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Platform</dt>
                  <dd class="truncate">
                    <span v-for="platform in activeModuleDetails.platform">
                      {{ platform }} <br />
                    </span>
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Authors</dt>
                  <dd class="truncate">
                    <span v-for="author in activeModuleDetails.authors">
                      {{ author }} <br />
                    </span>
                  </dd>
                </dl>
                <button
                  type="button"
                  @click="showRunningModuleModal"
                  class="mt-6 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Set options
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="query !== '' && results.length === 0"
            class="py-14 px-6 text-center text-sm sm:px-14"
          >
            <UsersIcon class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
            <p class="mt-4 font-semibold text-gray-900">No module found</p>
            <p class="mt-2 text-gray-500">
              We couldn’t find anything with that term. Please try again.
              {{ noResults }}
            </p>
          </div>
        </Combobox>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { computed, ref, watch, onBeforeMount, reactive, onMounted } from "vue";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import useEventsBus from "../../composables/eventBus";
import { storeToRefs } from "pinia";
import ModuleDataService from "../../services/ModuleDataService";

import { useVueFuse } from "vue-fuse";

const { bus, emit } = useEventsBus();
const recent = [];

const modules = ref([]);
const query = ref("");
const activeModuleDetails = ref([]);

const { search, results, noResults } = useVueFuse(modules, {
  keys: [{ name: "module_name", weight: 1 }],
  includeScore: true,
  threshold: 0.0,
});

function details(name) {
  return name + "tesssttt";
}

async function getAllPayloads() {
  return ModuleDataService.payloads()
    .then((res) => {
      //setTimeout(() => (modules.value = res.data.data.modules), 2000);
      //modules.value = res.data.data.modules;
      const response = res.data.data.modules;
      response.forEach(function (payload, index) {
        response[index] = { module_name: payload, module_type: "payload" };
      });
      console.log(response);
      return response;
      //modules.value.push("testtttttttt");
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getAllExploits() {
  return ModuleDataService.exploits()
    .then((res) => {
      const response = res.data.data.modules;
      response.forEach(function (exploit, index) {
        response[index] = { module_name: exploit, module_type: "exploit" };
      });
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getAllAuxiliaries() {
  return ModuleDataService.auxiliary()
    .then((res) => {
      const response = res.data.data.modules;
      response.forEach(function (exploit, index) {
        response[index] = { module_name: exploit, module_type: "auxiliary" };
      });
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getAllPosts() {
  return ModuleDataService.post()
    .then((res) => {
      const response = res.data.data.modules;
      response.forEach(function (exploit, index) {
        response[index] = { module_name: exploit, module_type: "post" };
      });
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getAllSpecificCategoryModules(categoryName) {
  const test = exploits();
  return ModuleDataService.test
    .then((res) => {
      const response = res.data.data.modules;
      response.forEach(function (exploit, index) {
        response[index] = { module_name: exploit, module_type: categoryName };
      });
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getModulesDetails(modules) {
  console.log("dziala");
  modules.value.forEach(async function (module, i) {
    console.log(module, i);
    //getModuleDetails2(module);
    module[i] = "duppa";
    // results[i] = await getModuleDetails2(module);
  });
}

async function getModuleDetails2(module) {
  //console.log(module);
  /*
  const data = {
    module_type: "payload",
    module_name: moduleName,
  };
*/
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

const showRunningModuleModal = () => {
  toggleSearchBox();
  emit("showRunModuleModal", { module_data: activeModuleDetails });
};

async function test(module) {
  await getModuleDetails2(module);
  // setTimeout(() => getModuleDetails2(module), 300);
}

onMounted(async () => {
  const exploits = await getAllExploits();
  const payloads = await getAllPayloads();
  const auxiliaries = await getAllAuxiliaries();
  const posts = await getAllPosts();
  //nops
  //encoders

  //console.log(payloads);
  //const exploits = await getAllSpecificCategoryModules("exploit");
  modules.value = modules.value.concat(exploits, payloads, auxiliaries);
  console.log(modules.value);
  // modules.value.push("testtttttttt");
  //getModulesDetails(modules);
});

let open = ref(false);

const filteredModules = computed(() =>
  query.value === ""
    ? []
    : modules.filter((module) => {
        console.log(module);
        return module.toLowerCase().includes(query.value.toLowerCase());
      })
);

const computedResults = computed(() => {
  return Array.from(results).slice(0, 10);
});

function goToModuleRunnningModal(module) {
  alert("run " + module.name);
  console.log(module.options);
}

function toggleSearchBox() {
  open.value = !open.value;
}

watch(
  () => bus.value.get("showModulesSearchEngine"),
  () => {
    toggleSearchBox();
  }
);

const onSelect = (module) => {
  window.location = module.url;
};
</script>
