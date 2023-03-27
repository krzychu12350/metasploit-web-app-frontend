<template>
  <div class="px-4 sm:px-6 lg:px-8 mt-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto flex justify-between">
        <div>
          <h1 class="text-xl font-semibold text-gray-900">Scripts</h1>
          <p class="mt-2 text-sm text-gray-700">A list of metasploit resource scripts</p>
        </div>
        <div>
          <button
            v-tooltip.top="'Add a new script'"
            @click="emit('showCreatingNewScriptModal')"
            class="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add a new script
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    File absolute path
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Created at
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Updated at
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  v-for="(script, scriptIdx) in result"
                  :key="script"
                  :class="scriptIdx % 2 === 0 ? undefined : 'bg-gray-50'"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ script.id }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ script.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ script.file_abs_path }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ script.type }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ moment(script.created_at).format("LLL") }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ moment(script.updated_at).format("LLL") }}
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <div class="flex">
                      <EyeIcon
                        class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        v-tooltip.top="'See script details'"
                        @click="emit('showScriptDetailsModal', { script_data: script })"
                        aria-hidden="true"
                      />
                      <PlayIcon
                        class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        v-if="script.type !== 'meterpreter'"
                        v-tooltip.top="'Run script'"
                        @click="
                          emit('runConsoleScript', {
                            script_data: script,
                          })
                        "
                        aria-hidden="true"
                      />

                      <PencilIcon
                        class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        v-tooltip.top="'Edit script'"
                        @click="
                          emit('showEditingScriptModal', {
                            script_data: script,
                          })
                        "
                        aria-hidden="true"
                      />
                      <XMarkIcon
                        class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        v-tooltip.top="'Delete script'"
                        @click="
                          emit('showScriptDeletingModal', {
                            script_id: script.id,
                          })
                        "
                        aria-hidden="true"
                      />
                    </div>
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
                  @click="prev"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="next()"
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
</template>

<script setup>
import { ref, watch, onBeforeMount, inject } from "vue";
import ScriptsDataService from "../../services/ScriptsDataService";
import moment from "moment";

import { PencilIcon, XMarkIcon, EyeIcon, PlayIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import { useArrayPagination } from "vue-composable";

const { bus, emit } = useEventsBus();
let scripts = ref([]);
const $loading = inject("$loading");

const { result, next, prev, currentPage, lastPage } = useArrayPagination(scripts, {
  pageSize: 5,
});

async function getAllScripts() {
  const loader = $loading.show();
  return ScriptsDataService.getAllMsfScripts()
    .then((res) => {
      scripts.value = res.data.scripts;
      loader.hide();
    })
    .catch((err) => {
      loader.hide();
      console.log(err);
    });
}

onBeforeMount(async () => {
  emit("refreshScriptsTable");
  prev();
});

watch(
  () => bus.value.get("refreshScriptsTable"),
  async () => {
    await getAllScripts();
  }
);
</script>
