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
                  v-for="(session, key, sessionIdx) in sessions"
                  :key="session.type"
                  :class="sessionIdx % 2 === 0 ? undefined : 'bg-gray-50'"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ session.uuid }} {{ key }}
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
                      @click="router.push('/sessions/' + key)"
                      aria-hidden="true"
                    />
                    <XMarkIcon
                      class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                      @click="emit('showSessionKillingModal', { sessionId: key })"
                      aria-hidden="true"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon, ArrowRightOnRectangleIcon } from "@heroicons/vue/24/solid";
import SessionDataService from "../../services/SessionDataService";
import { watch, ref, reactive, onBeforeMount, onMounted } from "vue";
import { PencilIcon, XMarkIcon, CalculatorIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import { useRouter } from "vue-router";

const router = useRouter();
const { bus, emit } = useEventsBus();

const sessions2 = [
  {
    sessionId: "Session 1",
    os: "Windows 10",
    type: "Meterpreter",
    attackModule: "windows/meterpreter/reverse_tcp",
  },
];

let sessions = ref([]);

async function getAllSessions() {
  return SessionDataService.list()
    .then((res) => {
      return res.data.data;
      console.log(sessions);
    })
    .catch((err) => {
      console.log(err);
    });
}
onMounted(() => {});

async function fetchSessions() {
  sessions.value = await getAllSessions();
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
<style scoped></style>
