<template>
  <div class="px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1">
      <div class="flex">
        <div>
          <ArrowSmallUpIcon
            @click="goToParentDir()"
            class="w-10 h-10 text-indigo-500 cursor-pointer"
            v-tooltip.top="'Go to the parent directory'"
          ></ArrowSmallUpIcon>
        </div>

        <div class="w-5/6 mr-2">
          <label for="email" class="sr-only">Path</label>
          <input
            v-on:keyup.enter="changeCurrentDirectory()"
            type="text"
            name="path"
            id="path"
            v-model="attackerLwd"
            class="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Path..."
          />
        </div>
        <div>
          <div class="relative rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              v-model="search"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6">
        <div v-for="(row, rowIdx) in filteredFiles" :key="rowIdx" class="flex p-1">
          <input
            type="checkbox"
            :id="row[4]"
            :value="row[4]"
            name="file"
            v-model="selectedFiles"
          />
          <div class="flex flex-col p-1">
            <font-awesome-icon
              v-if="row[2] == 'dir'"
              class="w-10 h-10 text-yellow-400"
              icon="fa-solid fa-folder"
              @click.right="changeClickedFile(row)"
              v-contextmenu:contextmenu
            />
            <font-awesome-icon
              v-else
              class="w-10 h-10 text-gray-600"
              icon="fa-solid fa-file"
              @click.right="changeClickedFile(row)"
            />
            <input
              @blur="handleBlurInput(row[4])"
              v-on:keyup.enter="handleBlurInput(row[4])"
              class="text-xs"
              :value="row[4]"
              :id="row[4]"
              disabled="true"
            />
          </div>
        </div>
      </div>
      <v-contextmenu ref="contextmenu">
        <v-contextmenu-item @click="openFile()">Open</v-contextmenu-item>
      </v-contextmenu>
      <div class="mt-5 sm:mt-6">
        <button
          @click="uploadSelectedFiles()"
          class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm"
        >
          Upload
        </button>
      </div>
    </dl>
  </div>
  <file-or-dir-props-modal></file-or-dir-props-modal>
  <file-deleting-modal></file-deleting-modal>
  <file-content-modal>></file-content-modal>
  <create-new-directory-modal></create-new-directory-modal>
  <file-checksum-modal></file-checksum-modal>
</template>

<script setup>
import { ref, reactive, onBeforeMount, inject, computed } from "vue";
import SessionDataService from "../../../../../services/SessionDataService";
import { useRoute } from "vue-router";
import meterpreterCommands from "../../../../../constants/MeterpreterCommands";
import useEventsBus from "../../../../../composables/eventBus";
import FileOrDirPropsModal from "../victim/components/FilePropsModal.vue";
import FileDeletingModal from "../victim/components/FileDeletingModal.vue";
import FileContentModal from "../victim/components/FileContentModal.vue";
import CreateNewDirectoryModal from "../victim/components/CreateNewDirectoryModal.vue";
import FileChecksumModal from "../victim/components/FileChecksumModal.vue";
import { ArrowSmallUpIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import ToastService from "../../../../../services/ToastService";

const $loading = inject("$loading");
const formContainer = ref(null);
const fullPage = ref(true);

const route = useRoute();
const currentSessionId = ref(route.params.id);
let rows = reactive([]);
let attackerLwd = ref();
let clickedFile = ref();
let search = ref("");
let selectedFiles = ref([]);

const props = defineProps({
  victimPwdPath: {
    type: String,
    required: true,
  },
});

const { emit } = useEventsBus();

onBeforeMount(async () => {
  readFileSystemData();
});

async function changeClickedFile(row) {
  clickedFile.value = row;
}

async function readFileSystemData() {
  rows.splice(0);
  const fileSystemData = await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.LLS
  );
  console.log(fileSystemData);
  await processFileSystemData(fileSystemData);
  attackerLwd.value = await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.GETLWD
  );
  console.log(attackerLwd.value);
}

async function processFileSystemData(data) {
  const splicedArray = data.split("\n").splice(5);
  console.log(splicedArray);

  splicedArray.forEach((row) => {
    if (row) {
      let rowDetails = row.split("  ").filter((e) => e);
      rowDetails = rowDetails.map(function (e) {
        return e.trim();
      });
      rows.push(rowDetails);
    }
  });
  console.log(rows);
}

async function writeToMeterpreterSession(command) {
  console.log(formContainer.value);
  const loader = $loading.show({
    isFullPage: fullPage.value,
    container: formContainer.value,
  });

  const data = {
    session_id: currentSessionId.value,
    ps: command,
  };
  console.log(data);
  await SessionDataService.meterpreterWrite(data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      loader.hide();
      console.log(err);
    });

  return await readFromMeterpreterSession(loader);
}

async function readFromMeterpreterSession(loader) {
  return SessionDataService.meterpreterRead({
    session_id: currentSessionId.value,
  })
    .then((res) => {
      console.log(res.data);
      const response = res.data.data.data;
      console.log(response);
      loader.hide();
      return response;
    })
    .catch((err) => {
      console.log(err);
      loader.hide();
    });
}

async function openFile() {
  const command = meterpreterCommands.FileSystemCommands.LCD;
  await writeToMeterpreterSession(command + " " + clickedFile.value[4]);
  await readFileSystemData();
}

async function goToParentDir() {
  await writeToMeterpreterSession(meterpreterCommands.FileSystemCommands.LCD + " ..");
  await readFileSystemData();
}

async function changeCurrentDirectory() {
  alert(attackerLwd.value.replace(/\\/g, "/"));
  await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.LCD +
      " " +
      attackerLwd.value.replace(/\\/g, "/")
  );
  await readFileSystemData();
}

async function uploadSelectedFiles() {
  console.log(selectedFiles.value);
  console.log(props.victimPwdPath.replace(/\\/g, "/"));
  console.log(selectedFiles.value.join(" "));

  emit("readVictimFileSystem");
  emit("hideAttackerFilesUploadModal");
  ToastService.showToast("Files was uploaded successfully");
}

const filteredFiles = computed(() => {
  return search.value != ""
    ? rows.filter((file) => file[4]?.toLowerCase().includes(search.value.toLowerCase()))
    : rows;
});
</script>
