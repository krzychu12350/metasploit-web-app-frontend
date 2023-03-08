<template>
  <div class="px-4 sm:px-6 lg:px-8 mt-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto flex justify-between">
        <div>
          <h1 class="text-xl font-semibold text-gray-900">RPC Connections</h1>
          <p class="mt-2 text-sm text-gray-700">A list of RPC connections</p>
        </div>
        <div>
          <button
            @click="
              emit('showCreatingNewRpcConnectionModal', {
                all_connections: rpcConnections,
              })
            "
            class="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add New RPC Connection
          </button>
        </div>
      </div>
      <!--
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto">Add session</button>
            </div>
            -->
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
                    Connection ID
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    User name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    User password
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    IP Address
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Port
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Web Server URI
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    SSL
                  </th>
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  v-for="(connection, connectionIdx) in result"
                  :key="connection.id"
                  :class="connectionIdx % 2 === 0 ? undefined : 'bg-gray-50'"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ connection.id }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ connection.user_name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ connection.user_password }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ connection.ip }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ connection.port }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ connection.web_server_uri }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ connection.ssl }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <!--
                    {{ connection }}
                    {{ currentRpcConnectionSettings }}
                    -->
                    <span
                      v-if="
                        JSON.stringify(connection) ===
                        JSON.stringify(currentRpcConnectionSettings)
                      "
                      >X</span
                    >
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <div
                      v-if="
                        JSON.stringify(connection) !=
                        JSON.stringify(currentRpcConnectionSettings)
                      "
                      class="flex"
                    >
                      <ArrowsRightLeftIcon
                        class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        v-tooltip.top="'Connect'"
                        @click="switchRpcConnection(connection)"
                        aria-hidden="true"
                      />
                      <PencilIcon
                        class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        v-tooltip.top="'Edit connection settings'"
                        @click="
                          emit('showRpcConnectionEditingModal', {
                            all_connections: rpcConnections,
                            connection_data: connection,
                          })
                        "
                        aria-hidden="true"
                      />
                      <XMarkIcon
                        v-tooltip.top="'Delete connection'"
                        class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                        @click="showRpcConnectionDeletingModal(connection.id)"
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
                  @click="prev()"
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
  <CreatingNewRpcConnectionModal></CreatingNewRpcConnectionModal>
  <UpdatingNewRpcConnectionModal></UpdatingNewRpcConnectionModal>
</template>

<script setup>
import { ref, reactive, watch, onBeforeMount, onMounted, inject } from "vue";
import ToastService from "../../services/ToastService";
import { PencilIcon, XMarkIcon, ArrowsRightLeftIcon } from "@heroicons/vue/24/outline";
import MsfRpcServerConnectionService from "../../services/MsfRpcServerConnectionService";
import useEventsBus from "../../composables/eventBus";
import { useArrayPagination } from "vue-composable";
import { useCurrentMsfRpcConnection } from "../../stores/useCurrentMsfRpcConnection";
import CreatingNewRpcConnectionModal from "./CreatingNewRpcConnectionModal.vue";
import UpdatingNewRpcConnectionModal from "./UpdatingNewRpcConnectionModal.vue";
import useMsfRpcConnection from "../../composables/msfRpcConnection";
import { useMsfAuth } from "../../stores/useMsfAuth";
import { useMsfModules } from "../../stores/useMsfModules";
import { useRouter } from "vue-router";

const useCurrentMetasploitRpcConnection = useCurrentMsfRpcConnection();
let currentRpcConnectionSettings = reactive({});
const useMetasploitModules = useMsfModules();
let rpcConnections = ref([]);
const { bus, emit } = useEventsBus();
const $loading = inject("$loading");
const fullPage = ref(true);
const router = useRouter();

const { result, next, prev, currentPage, lastPage } = useArrayPagination(rpcConnections, {
  pageSize: 5,
});

async function fetchAllRpcConnections() {
  MsfRpcServerConnectionService.getConnections()
    .then((res) => {
      console.log(res.data.connections);
      rpcConnections.value = res.data.connections;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function showRpcConnectionDeletingModal(connectionId) {
  if (currentRpcConnectionSettings.id === connectionId) {
    ToastService.showToast("You cannot delete currently using RPC connection", "error");
  } else {
    emit("showRpcConnectionDeletingModal", {
      connection_id: connectionId,
    });
  }
}

onBeforeMount(async () => {
  fetchAllRpcConnections();
  prev();
  currentRpcConnectionSettings =
    useCurrentMetasploitRpcConnection.getCurrentRpcConnection;
  console.log(currentRpcConnectionSettings);
});

watch(
  () => bus.value.get("refreshRpcConnectionsTable"),
  () => {
    fetchAllRpcConnections();
  }
);

async function switchRpcConnection(connectionSettings) {
  const loader = $loading.show();
  //await useMsfRpcConnection.setMsfConnection(connectionSettings, loader);
  await setMsfConnection(connectionSettings, loader);
  console.log(connectionSettings);
}

async function setMsfConnection(credentials, loader) {
  useMsfAuth()
    .setConnection(credentials)
    .then(async (connectionSettings) => {
      console.log(connectionSettings);
      useCurrentMetasploitRpcConnection.setCurrentRpcConnection(connectionSettings);
      await loginToMsfRpc(credentials, loader);
    });
}

async function loginToMsfRpc(credentials, loader) {
  useMsfAuth()
    .login(credentials)
    .then(async () => {
      await useMetasploitModules.fetchAllModules();
      router.push("/");
      loader.hide();
    })
    .catch((err) => {
      loader.hide();
      console.log(err);
      ToastService.showToast(
        "Invalid credentials, check your MSF RPC Server Configuration",
        "error"
      );
    });
}
</script>
<style scoped></style>
