<template>
  <div class="px-4 sm:px-6 lg:px-8 mt-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto flex justify-between">
        <div>
          <h1 class="text-xl font-semibold text-gray-900">Workspaces</h1>
          <p class="mt-2 text-sm text-gray-700">A list of workspaces</p>
        </div>
        <div>
          <button
            @click="emit('showCreatingNewWorkspaceModal')"
            class="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add a new workspace
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
                    Created at
                  </th>

                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Current
                  </th>
                  <!--
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
                  v-for="(workspace, workspaceIdx) in result"
                  :key="workspace"
                  :class="workspaceIdx % 2 === 0 ? undefined : 'bg-gray-50'"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ workspace.id }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ workspace.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ workspace.created_at }}
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span v-if="workspace.name === currentWorkspaceName">X</span>
                  </td>
                  <!--
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ workspace.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ workspace.name }}
                  </td>
                  -->
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <div class="flex">
                      <ArrowsRightLeftIcon
                        class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        v-if="workspace.name !== currentWorkspaceName"
                        v-tooltip.top="'Change workspace'"
                        @click="
                          emit('changeWorkspace', { workspace_name: workspace.name })
                        "
                        aria-hidden="true"
                      />
                      <XMarkIcon
                        class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        v-tooltip.top="'Delete workspace'"
                        @click="
                          emit('showWorkspaceDeletingModal', {
                            workspace_name: workspace.name,
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
import ConsoleDataService from "../../services/ConsoleDataService";
import moment from "moment";
import ToastService from "../../services/ToastService";
import {
  PencilIcon,
  XMarkIcon,
  CalculatorIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import { useArrayPagination } from "vue-composable";

const { bus, emit } = useEventsBus();
let workspaces = ref([]);
let currentWorkspaceName = ref("");
const $loading = inject("$loading");

const { result, next, prev, currentPage, lastPage } = useArrayPagination(workspaces, {
  pageSize: 5,
});

async function getAllWorkspaces() {
  return DatabaseDataService.getWorkspaces()
    .then((res) => {
      //console.log(res.data.workspaces);
      workspaces.value = res.data.workspaces;
    })
    .catch((err) => {
      console.log(err);
    });
}

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

async function manageWorkspace(operationCommand) {
  const loader = $loading.show();
  let readedDataFromConsole = {};
  let createdConsole = await createConsole();
  const createdConsoleId = createdConsole.id;
  await readDataFromConsole(createdConsoleId);
  await writeDataIntoConsole(createdConsoleId, operationCommand);

  readedDataFromConsole = await readDataFromConsole(createdConsoleId);

  console.log(readedDataFromConsole);
  //currentWorkspaceName.value = "default";
  await destroyConsole(createdConsoleId);
  loader.hide();
  return readedDataFromConsole;
}

async function getCurrentWorkspace() {
  let workspacesAsString = await manageWorkspace("workspace");
  console.log(workspacesAsString);
  const splicedWorkspacesArray = workspacesAsString.data.split("\n");
  console.log(splicedWorkspacesArray);
  const currentWorkspace = splicedWorkspacesArray.find((el) => el.includes("*"));
  currentWorkspaceName.value = currentWorkspace.slice(2);
}
onMounted(() => {});

onBeforeMount(async () => {
  emit("refreshWorkspacesTable");
  prev();
});

watch(
  () => bus.value.get("refreshWorkspacesTable"),
  async () => {
    await getCurrentWorkspace();
    console.log(currentWorkspaceName.value);
    await getAllWorkspaces();
  }
);

watch(
  () => bus.value.get("deleteWorkspace"),
  async (data) => {
    const workspaceName = data[0].workspace_name;
    let operationResult = await manageWorkspace("workspace -d " + workspaceName);
    ToastService.showToast(operationResult.data);
    emit("refreshWorkspacesTable");
  }
);

watch(
  () => bus.value.get("createNewWorkspace"),
  async (data) => {
    const workspaceName = data[0].workspace_name;
    let operationResult = await manageWorkspace("workspace -a " + workspaceName);
    ToastService.showToast(operationResult.data);
    emit("refreshWorkspacesTable");
  }
);

watch(
  () => bus.value.get("changeWorkspace"),
  async (data) => {
    const workspaceName = data[0].workspace_name;
    let operationResult = await manageWorkspace("workspace " + workspaceName);
    ToastService.showToast(operationResult.data);
    emit("refreshWorkspacesTable");
  }
);
</script>
