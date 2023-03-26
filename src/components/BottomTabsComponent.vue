<template>
  <div class="min-w-full">
    <div class="sm:hidden">
      <label for="consoles" class="sr-only">Select a console</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="consoles"
        name="consoles"
        class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      >
        <XMarkIcon
          @click="killConsole(console.id)"
          class="w-5 h-5 cursor-pointer hover:bg-gray-200"
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
          class="flex items-center justify-between cursor-pointer group min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center focus:z-10"
          :class="[
            console.id == useCurrentConsoleId.getCurrentConsoleId
              ? 'bg-gray-200'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          <div class="w-5/6">
            <a
              :key="console.id"
              :href="console.href"
              @click="changeCurrentConsole(console.id)"
              class="flex items-center justify-center"
              :class="[
                console.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
              ]"
              :aria-current="console.current ? 'page' : undefined"
            >
              <span>Console {{ console.id }}</span></a
            >
          </div>

          <div class="h-full w-1/6">
            <XMarkIcon
              @click="killConsole(console.id)"
              class="w-5 h-5 cursor-pointer hover:bg-gray-200"
            ></XMarkIcon>
          </div>
        </div>
        <div
          class="flex items-center justify-between cursor-pointer group min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
          @click="createNewConsole()"
        >
          <div class="w-5/6">
            <a class="flex items-center justify-center">
              <PlusIcon class="w-5 h-5 mr-2"></PlusIcon>
              <span>Add a new console </span>
              <!-- {{ useCurrentConsoleId.getCurrentConsoleId }}-->
            </a>
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

let curentConsoleId = ref();

onBeforeMount(async () => {
  await getAllConsoles();
  //emit("setMaxConsoleId");
  emit("changeCurrentConsole", { console_id: useCurrentConsoleId.getCurrentConsoleId });
});

async function changeCurrentConsole(consoleId) {
  useCurrentConsoleId.setCurrentConsoleId(consoleId);
  emit("changeCurrentConsole", { console_id: consoleId });
}

async function getAllConsoles() {
  ConsoleDataService.list()
    .then((res) => {
      console.log(res.data.data.consoles);
      consoles.value = res.data.data.consoles;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function createNewConsole() {
  ConsoleDataService.create()
    .then((res) => {
      console.log(res.data);
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
      //console.log(res.data.data);
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
