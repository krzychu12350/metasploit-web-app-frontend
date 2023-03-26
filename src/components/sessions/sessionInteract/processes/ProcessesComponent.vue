<template>
  <div class="px-4 py-5 sm:px-6">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    PID
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    PPID
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Arch
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Session
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Path
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(process, index) in processPagination"
                  :key="process.email"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ process[0] }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ process[1] }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ process[2] }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ process[3] }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ process[4] }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ process[5] }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ process[6] }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <TrashIcon
                      class="w-5 h-5 cursor-pointer text-indigo-500"
                      @click="
                        emit('showProcessKillingModal', { process_pid: process[0] })
                      "
                    ></TrashIcon>
                  </td>
                </tr>
              </tbody>
            </table>
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
      <li v-for="n in processPagination" :key="n">{{ n }}</li>
    </ul>
  </div>
-->
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
  <ProcessKillingModal></ProcessKillingModal>
</template>

<script setup>
import { ref, reactive, onBeforeMount, computed, onMounted, watch } from "vue";
import { usePagination } from "vue-composable";
import SessionDataService from "../../../../services/SessionDataService";
import { useRoute } from "vue-router";
import { TrashIcon } from "@heroicons/vue/24/solid";
import meterpreterCommands from "../../../../constants/MeterpreterCommands";
import useEventsBus from "../../../../composables/eventBus";
import ProcessKillingModal from "./components/ProcessKillingModal.vue";

const route = useRoute();
let processes = ref([]);
const currentSessionId = ref(route.params.id);
const { bus, emit } = useEventsBus();

// paginate array
const { currentPage, lastPage, next, prev, offset, pageSize } = usePagination({
  currentPage: 1,
  pageSize: 10,
  total: computed(() => processes.value.length),
});

const processPagination = computed(() => {
  const array = processes.value;
  if (!Array.isArray(processes.value)) return [];
  return processes.value.slice(offset.value, offset.value + pageSize.value);
});

onBeforeMount(async () => {
  await loadProcessList();
});

async function loadProcessList() {
  await requestAllProcess();
  await getAllProcess();
}
async function requestAllProcess() {
  SessionDataService.meterpreterWrite({
    session_id: currentSessionId.value,
    ps: meterpreterCommands.SystemCommands.PS,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getAllProcess() {
  processes.value.splice(0);
  SessionDataService.meterpreterRead({
    session_id: currentSessionId.value,
  })
    .then((res) => {
      const response = res.data.data.data;
      console.log(response);

      const splicedProcessesArray = response.split("\n").splice(6);

      console.log(splicedProcessesArray);

      splicedProcessesArray.forEach((process) => {
        let processDetails = process.split(/\s+/).filter((e) => e);
        if (process) {
          processDetails = processDetails.map(function (e) {
            return e.trim();
          });

          processes.value.push(processDetails);
        }
      });

      console.log(processes.value);
      processes.value.shift();
      next();
      /*
      const processs = response.split("\n");
      console.log(processs);



      */
    })
    .catch((err) => {
      console.log(err);
    });
}

watch(
  () => bus.value.get("refreshProcessesList"),
  async () => {
    await loadProcessList();
    prev();
  }
);
</script>
