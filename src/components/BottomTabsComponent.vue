<template>
  <div class="min-w-full">
    <div class="sm:hidden">
      <label for="consoles" class="sr-only">Select a console</label>
      <select
        id="consoles"
        name="consoles"
        class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      >
        <XMarkIcon
          @click="killConsole(console.id)"
          class="w-5 h-fu cursor-pointer hover:bg-gray-200 bg-white"
        ></XMarkIcon>
        <option
          v-for="console in consoles"
          :key="console.id"
          :selected="consoles.current"
          @click="emit('changeCurrentConsole', { console_id: console.id })"
        >
          Console {{ console.id }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex flex-wrap" aria-label="Tabs">
        <div
          v-for="(console, index) in consoles"
          class="border-solid border-l-2 border-r-2 border-gray-300 flex items-center flex-wrap justify-between cursor-pointer group min-w-0 flex-1 overflow-hidden bg-white py-2 px-2 text-sm font-medium text-center focus:z-10"
          :class="[
            console.id == useCurrentConsoleId.getCurrentConsoleId
              ? 'bg-gray-200'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          <div></div>
          <div v-tooltip.top="'Switch to this console'">
            <a
              :key="console.id"
              :href="console.href"
              @click="changeCurrentConsole(console.id)"
              class="flex items-center justify-center"
              :class="[
                console.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
              ]"
              :aria-current="console.current ? 'page' : undefined"
            >
              <span>Console {{ console.id }}</span></a
            >
          </div>

          <div class="">
            <XMarkIcon
              @click="killConsole(console.id)"
              class="w-5 h-5 cursor-pointer hover:bg-gray-200 bg-white"
              v-tooltip.top="'Kill console'"
            ></XMarkIcon>
          </div>
        </div>
        <div
          class="border-solid border-l-2 border-gray-300 flex justify-center items-center cursor-pointer group min-w-0 flex-1 overflow-hidden bg-white py-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
          @click="createNewConsole()"
          v-tooltip.top="'Add a new console'"
        >
          <div class="flex">
            <PlusIcon class="w-5 h-5 mr-2 text-gray-500 hover:text-gray-700"></PlusIcon>
            <span class="text-gray-500 hover:text-gray-700"> Add a new console </span>
            <!-- {{ useCurrentConsoleId.getCurrentConsoleId }}-->
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import ConsoleDataService from "../services/ConsoleDataService";
import useEventsBus from "../composables/eventBus";
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import ToastService from "../services/ToastService";
import { useCurrentConsole } from "../stores/useCurrentConsole";

const { emit, bus } = useEventsBus();

const tabs = ref([
  { name: "Console 0", href: "#", current: true },
  { name: "Info", href: "#", current: false },
  { name: "Session 1", href: "#", current: false },
  { name: "Session 2", href: "#", current: false },
]);

const consoles = ref();
const useCurrentConsoleId = useCurrentConsole();

onBeforeMount(async () => {
  await getAllConsoles();
  emit("changeCurrentConsole", { console_id: useCurrentConsoleId.getCurrentConsoleId });
});

async function changeCurrentConsole(consoleId) {
  useCurrentConsoleId.setCurrentConsoleId(consoleId);
  emit("changeCurrentConsole", { console_id: consoleId });
}

async function getAllConsoles() {
  ConsoleDataService.list()
    .then((res) => {
      consoles.value = res.data.data.consoles;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function createNewConsole() {
  ConsoleDataService.create()
    .then((res) => {
      if (res.data.status === true) {
        ToastService.showToast(
          "Console " + res.data.data.id + " was created successfully"
        );
        emit("changeCurrentConsole", { console_id: res.data.data.id });
        emit("refreshTabs");
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function killConsole(consoleId) {
  ConsoleDataService.destroy({ console_id: consoleId })
    .then(async (res) => {
      if (res.data.data.result == "success") {
        emit("setMaxConsoleId");
        await getAllConsoles();

        ToastService.showToast("Console " + consoleId + " was killed successfully");
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}

watch(
  () => bus.value.get("refreshTabs"),
  () => {
    getAllConsoles();
  }
);
</script>
