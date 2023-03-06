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
          class="flex items-center justify-between cursor-pointer group min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
        >
          <div class="w-5/6">
            <a
              :key="console.id"
              :href="console.href"
              @click="emit('changeCurrentConsole', { console_id: console.id })"
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
      </nav>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import ConsoleDataService from "../services/ConsoleDataService";
import useEventsBus from "../composables/eventBus";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import ToastService from "../services/ToastService";

const { emit, bus } = useEventsBus();

const tabs = ref([
  { name: "Console 0", href: "#", current: true },
  { name: "Info", href: "#", current: false },
  { name: "Session 1", href: "#", current: false },
  { name: "Session 2", href: "#", current: false },
]);

const consoles = ref();

onBeforeMount(async () => {
  await getAllConsoles();
});

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

async function killConsole(consoleId) {
  ConsoleDataService.destroy({ console_id: consoleId })
    .then(async (res) => {
      //console.log(res.data.data);
      if (res.data.data.result == "success") {
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
