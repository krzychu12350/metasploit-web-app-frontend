<template>
  <div class="px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1">
      <div class="flex">
        <div>
          <ArrowSmallUpIcon
            @click="goToParentDir()"
            @pointerdown="goToParentDir()"
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
            v-model="victimLwd"
            class="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Path..."
          />
        </div>
        <div>
          <label for="email" class="sr-only block text-sm font-medium text-gray-700"
            >Email</label
          >
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

        <div class="ml-2 flex items-center">
          <font-awesome-icon
            @click="emit('showCreateNewDirectoryModal')"
            icon="fa-solid fa-folder-plus"
            class="w-8 h-8 text-indigo-500 cursor-pointer"
            v-tooltip.top="'Make new directory'"
          />
          <font-awesome-icon
            class="w-9 h-9 text-indigo-500 cursor-pointer ml-2"
            icon="fa-solid fa-cloud-arrow-up"
            v-tooltip.top="'Upload a file'"
            @click="emit('showAttackerFilesUploadModal', { victim_lwd: victimLwd })"
          />
        </div>
      </div>

      <div class="grid grid-cols-6">
        <div
          v-for="(row, rowIdx) in filteredFiles"
          :key="rowIdx"
          class="flex flex-col p-1"
        >
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
            v-contextmenu:contextmenu
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
      <v-contextmenu ref="contextmenu">
        <v-contextmenu-item @click="openFile()">Open</v-contextmenu-item>
        <v-contextmenu-item v-if="clickedFile[2] == 'fil'" @click="downloadSpecificFile()"
          >Download</v-contextmenu-item
        >
        <v-contextmenu-item>Copy</v-contextmenu-item>
        <v-contextmenu-item @click="renameFile(clickedFile)">Rename</v-contextmenu-item>
        <v-contextmenu-item
          @click="
            emit('showFileDeletingModal', {
              clicked_file: clickedFile,
            })
          "
          >Delete</v-contextmenu-item
        >
        <v-contextmenu-item
          @click="
            emit('showFileOrDirDetailsModal', {
              clicked_file: clickedFile,
            })
          "
          >Properties</v-contextmenu-item
        >

        <v-contextmenu-submenu title="Checksum">
          <v-contextmenu-item @click="getFileCheckSum('md5')">MD5</v-contextmenu-item>
          <v-contextmenu-item @click="getFileCheckSum('sha1')">SHA 1</v-contextmenu-item>
        </v-contextmenu-submenu>
      </v-contextmenu>
    </dl>
  </div>
  <file-or-dir-props-modal></file-or-dir-props-modal>
  <file-deleting-modal></file-deleting-modal>
  <file-content-modal>></file-content-modal>
  <create-new-directory-modal></create-new-directory-modal>
  <file-checksum-modal></file-checksum-modal>
  <files-upload-modal></files-upload-modal>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted, inject, watch, computed } from "vue";
import SessionDataService from "../../../../../services/SessionDataService";
import { useRoute } from "vue-router";
import meterpreterCommands from "../../../../../constants/MeterpreterCommands";
import useEventsBus from "../../../../../composables/eventBus";
import FileOrDirPropsModal from "./components/FilePropsModal.vue";
import FileDeletingModal from "./components/FileDeletingModal.vue";
import FileContentModal from "./components/FileContentModal.vue";
import CreateNewDirectoryModal from "./components/CreateNewDirectoryModal.vue";
import FileChecksumModal from "./components/FileChecksumModal.vue";
import FilesUploadModal from "../attacker/FilesUploadModal.vue";
/*arrow-small-up*/
import { ArrowSmallUpIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import ToastService from "../../../../../services/ToastService";

const $loading = inject("$loading");
const formContainer = ref(null);
const fullPage = ref(true);

const route = useRoute();
const currentSessionId = ref(route.params.id);
let meterpreterData = ref();
let rows = reactive([]);
let victimLwd = ref();
let clickedFile = ref();
let search = ref("");
let isFileNameInputDisabled = ref(true);
const { bus, emit } = useEventsBus();

onBeforeMount(async () => {
  emit("readVictimFileSystem");
});

async function changeClickedFile(row) {
  clickedFile.value = row;
}

async function readFileSystemData() {
  rows.splice(0);
  const fileSystemData = await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.LS
  );
  victimLwd.value = await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.GETWD
  );
  await processFileSystemData(fileSystemData);
}

async function processFileSystemData(data) {
  const splicedArray = data.split("\n").splice(5);

  splicedArray.forEach((row) => {
    if (row) {
      let rowDetails = row.split("  ").filter((e) => e);
      rowDetails = rowDetails.map(function (e) {
        return e.trim();
      });
      rows.push(rowDetails);
    }
  });
}
async function writeToMeterpreterSession(command) {
  const loader = $loading.show({
    isFullPage: fullPage.value,
    container: formContainer.value,
  });
  const data = {
    session_id: currentSessionId.value,
    ps: command,
  };

  await SessionDataService.meterpreterWrite(data)
    .then((res) => {})
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
      const response = res.data.data.data;

      loader.hide();
      return response;
    })
    .catch((err) => {
      console.log(err);
      loader.hide();
    });
}

async function openFile() {
  let command = "";
  if (clickedFile.value[2] == "fil") {
    command = meterpreterCommands.FileSystemCommands.CAT;
  } else {
    command = meterpreterCommands.FileSystemCommands.CD;
  }
  const responseData = await writeToMeterpreterSession(
    command + " " + clickedFile.value[4]
  );

  if (clickedFile.value[2] == "fil") {
    emit("showFileContentModal", {
      file_content: responseData,
    });
  } else {
    readFileSystemData();
  }
}

async function downloadSpecificFile() {
  const downloadInfo = await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.DOWNLOAD + " " + clickedFile.value[4]
  );
  ToastService.showToast(downloadInfo.split("[*] ")[2]);
}

watch(
  () => bus.value.get("deleteSpecficFile"),
  (val) => {
    clickedFile.value = val[0].file;
    let command = "";
    if (clickedFile.value[2] == "fil") {
      command = meterpreterCommands.FileSystemCommands.RM;
    } else {
      command = meterpreterCommands.FileSystemCommands.RMDIR;
    }

    writeToMeterpreterSession(command + " '" + clickedFile.value[4] + "'");
    emit("readVictimFileSystem");
    ToastService.showToast(clickedFile.value[4] + " was deleted successfully");
  }
);

watch(
  () => bus.value.get("createNewDirectory"),
  async (val) => {
    const dirName = val[0].directory_name;
    const responseMessage = await createNewDirectory(dirName);
    if (responseMessage.includes("Operation failed"))
      ToastService.showToast(
        "Cannot create a file when that file already exists. ",
        "error"
      );
    else ToastService.showToast("Created " + dirName + " directory");
  }
);

watch(
  () => bus.value.get("readVictimFileSystem"),
  async (val) => {
    await readFileSystemData();
  }
);

async function goToParentDir() {
  await writeToMeterpreterSession(meterpreterCommands.FileSystemCommands.CD + " ..");
  await readFileSystemData();
}
async function createNewDirectory(directoryName) {
  const response = await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.MKDIR + " " + directoryName
  );
  await readFileSystemData();

  return response;
}

async function renameFile(file) {
  const input = document.getElementById(file[4]);
  input.style.width = input.value.length + 2 + "ch";
  input.disabled = false;
  input.focus();
}

async function handleBlurInput(oldfileName) {
  const input = document.getElementById(oldfileName);
  input.disabled = true;
  input.blur();
  const newFileName = input.value;
  if (oldfileName != newFileName) {
    await writeToMeterpreterSession(
      meterpreterCommands.FileSystemCommands.MV + " " + oldfileName + " " + newFileName
    );
  }
}

async function changeCurrentDirectory() {
  await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.CD + " " + victimLwd.value.replace(/\\/g, "/")
  );
  await readFileSystemData();
}

async function getFileCheckSum(algoType) {
  const fileCheckSum = await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.CHECKSUM +
      " " +
      algoType +
      " " +
      clickedFile.value[4]
  );

  emit("showFileChecksumModal", { file_checksum: fileCheckSum });
}

const filteredFiles = computed(() => {
  return search.value != ""
    ? rows.filter((file) => file[4]?.toLowerCase().includes(search.value.toLowerCase()))
    : rows;
});
</script>
