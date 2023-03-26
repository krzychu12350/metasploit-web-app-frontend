<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Active sessions</h1>
        <p class="mt-2 text-sm text-gray-700">A list of active sessions</p>
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
                    UUID
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
                    Session host
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Session port
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Via exploit
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Via payload
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
                  v-for="(session, key, sessionIdx) in result"
                  :key="session.type"
                  :class="sessionIdx % 2 === 0 ? undefined : 'bg-gray-50'"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ session.uuid }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ session.type }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ session.session_host }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ session.session_port }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ session.via_exploit }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ session.via_payload }}
                  </td>
                  <td
                    class="flex relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <ArrowRightOnRectangleIcon
                      class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                      @click="router.push('/sessions/' + session.id)"
                      v-tooltip.top="'Interact'"
                      aria-hidden="true"
                    />
                    <XMarkIcon
                      class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                      @click="emit('showSessionKillingModal', { sessionId: session.id })"
                      v-tooltip.top="'Destroy session'"
                      aria-hidden="true"
                    />
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
import { HomeIcon, ArrowRightOnRectangleIcon } from "@heroicons/vue/24/solid";
import SessionDataService from "../../services/SessionDataService";
import { inject, watch, ref, reactive, onBeforeMount, onMounted } from "vue";
import { PencilIcon, XMarkIcon, CalculatorIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import { useRouter } from "vue-router";
import { useArrayPagination } from "vue-composable";

const router = useRouter();
const { bus, emit } = useEventsBus();
const $loading = inject("$loading");

let sessions = ref([]);

const { result, next, prev, currentPage, lastPage } = useArrayPagination(sessions, {
  pageSize: 5,
});

async function getAllSessions() {
  const loader = $loading.show();
  return SessionDataService.list()
    .then((res) => {
      loader.hide();
      return res.data.data;
    })
    .catch((err) => {
      loader.hide();
      console.log(err);
    });
}

async function fetchSessions() {
  let sessionObjects = await getAllSessions();
  sessions.value = Object.keys(sessionObjects).map((key) => {
    sessionObjects[key].id = parseInt(key);
    return sessionObjects[key];
  });
  prev();
}

onBeforeMount(async () => {
  fetchSessions();
});

watch(
  () => bus.value.get("refreshSessionsTable"),
  () => {
    fetchSessions();
  }
);
</script>
