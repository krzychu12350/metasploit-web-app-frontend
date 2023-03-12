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

                  <!--
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Current
                  </th>
                 
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    LHOST
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    LPORT
                  </th>
                  -->
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

                  <!--
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ script.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ script.name }}
                  </td>
                  -->
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
import { ref, reactive, watch, onBeforeMount, onMounted, inject } from "vue";
import DatabaseDataService from "../../services/DatabaseDataService";
import ScriptsDataService from "../../services/ScriptsDataService";
import ConsoleDataService from "../../services/ConsoleDataService";
import moment from "moment";
import ToastService from "../../services/ToastService";

import {
  PencilIcon,
  XMarkIcon,
  EyeIcon,
  PlayIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import { useArrayPagination } from "vue-composable";

const { bus, emit } = useEventsBus();
///const useMsfScript = useMsfCurrentScript();
let scripts = ref([]);
let currentScriptName = ref("");
const $loading = inject("$loading");

const { result, next, prev, currentPage, lastPage } = useArrayPagination(scripts, {
  pageSize: 3,
});

async function getAllScripts() {
  return ScriptsDataService.getAllMsfScripts()
    .then((res) => {
      //console.log(res.data.scripts);
      scripts.value = res.data.scripts;
    })
    .catch((err) => {
      console.log(err);
    });
}
/*
async function createConsole() {
  return ConsoleDataService.create()
    .then((res) => {
      console.log(res.data);
      return res.data.data;
    })
    .catch((err) => console.log(err));
}

async function writeDataIntoConsole(consoleId, inputCommand) {
  ConsoleDataService.write({ console_id: consoleId, input_command: inputCommand })
    .then((res) => {
      console.log(res.data.data);
      //const test = "dddd";
      //this.send_to_terminal = `<p>` + res.data.data + `</p>`;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function readDataFromConsole(consoleId) {
  return ConsoleDataService.read({ console_id: consoleId })
    .then((res) => {
      console.log(res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function destroyConsole(consoleId) {
  return ConsoleDataService.destroy({ console_id: consoleId })
    .then((res) => {
      console.log(res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function manageScript(operationCommand) {
  const loader = $loading.show();
  let readedDataFromConsole = {};
  let createdConsole = await createConsole();
  const createdConsoleId = createdConsole.id;
  await readDataFromConsole(createdConsoleId);
  await writeDataIntoConsole(createdConsoleId, operationCommand);

  readedDataFromConsole = await readDataFromConsole(createdConsoleId);

  console.log(readedDataFromConsole);
  //currentScriptName.value = "default";
  await destroyConsole(createdConsoleId);
  loader.hide();
  return readedDataFromConsole;
}

async function getCurrentScript() {
  let scriptsAsString = await manageScript("script");
  console.log(scriptsAsString);
  const splicedScriptsArray = scriptsAsString.data.split("\n");
  console.log(splicedScriptsArray);
  const currentScript = splicedScriptsArray.find((el) => el.includes("*"));
  currentScriptName.value = currentScript.slice(2);
  useMsfScript.setCurrentRpcConnection(currentScriptName.value);
}
*/

onBeforeMount(async () => {
  emit("refreshScriptsTable");
  prev();
});

watch(
  () => bus.value.get("refreshScriptsTable"),
  async () => {
    //await getCurrentScript();
    //console.log(currentScriptName.value);
    await getAllScripts();
  }
);

/*
watch(
  () => bus.value.get("fetchCurrentScript"),
  async () => {
    await getCurrentScript();
  }
);

watch(
  () => bus.value.get("deleteScript"),
  async (data) => {
    const scriptName = data[0].script_name;
    let operationResult = await manageScript("script -d " + scriptName);
    ToastService.showToast(operationResult.data);
    emit("refreshScriptsTable");
  }
);

watch(
  () => bus.value.get("createNewScript"),
  async (data) => {
    const scriptName = data[0].script_name;
    let operationResult = await manageScript("script -a " + scriptName);
    ToastService.showToast(operationResult.data);
    emit("refreshScriptsTable");
  }
);

watch(
  () => bus.value.get("changeScript"),
  async (data) => {
    const scriptName = data[0].script_name;
    let operationResult = await manageScript("script " + scriptName);
    useMsfScript.setCurrentRpcConnection(scriptName);
    currentScriptName.value = await useMsfScript.getCurrentRpcConnection;
    ToastService.showToast(operationResult.data);
    emit("setCurrentScript");
    emit("refreshScriptsTable");
  }
);

watch(
  () => bus.value.get("editScriptName"),
  async (data) => {
    // const scriptName = data[0].script_name;
    const scriptOldName = data[0].script_old_name;
    const scriptNewName = data[0].script_new_name;

    let operationResult = await manageScript(
      "script -r " + scriptOldName + " " + scriptNewName
    );
    useMsfScript.setCurrentRpcConnection(scriptNewName);
    currentScriptName.value = await useMsfScript.getCurrentRpcConnection;
    ToastService.showToast(operationResult.data);
    //emit("setCurrentScript");
    emit("refreshScriptsTable");
  }
);
*/
</script>
