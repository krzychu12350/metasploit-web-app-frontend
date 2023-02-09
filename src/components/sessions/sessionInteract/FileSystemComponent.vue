<template>
  <div class="px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1">
      <!--<dt class="text-sm font-medium text-gray-500">File system</dt>
      <dd class="whitespace-pre">
        {{ meterpreterData }}
      </dd>
      -->

      <!--
      <font-awesome-icon class="w-10 h-10 text-yellow-400" icon="fa-solid fa-folder" />
      <font-awesome-icon class="w-10 h-10 text-gray-600" icon="fa-solid fa-file" />
      {{ victimLwd }}
    -->
      <div class="flex">
        <div>
          <ArrowSmallUpIcon
            @click="goToParentDir()"
            class="w-10 h-10 text-indigo-500 cursor-pointer"
            v-tooltip.top="'Go to the parent directory'"
          ></ArrowSmallUpIcon>
        </div>

        <div class="w-5/6">
          <label for="email" class="sr-only">Path</label>
          <input
            type="text"
            name="path"
            id="path"
            :value="victimLwd"
            class="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Path..."
          />
        </div>
        <div class="ml-4">
          <font-awesome-icon
            @click="emit('showCreateNewDirectoryModal')"
            icon="fa-solid fa-folder-plus"
            class="w-10 h-10 text-indigo-500 cursor-pointer"
            v-tooltip.top="'Make new directory'"
          />
        </div>
        <diV>
          <button>Upload</button>
        </diV>
      </div>

      <div class="grid grid-cols-6">
        <div v-for="(row, rowIdx) in rows" :key="rowIdx" class="flex flex-col p-1">
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
          <span class="text-xs"> {{ row[4] }}</span>
        </div>
      </div>
      <v-contextmenu ref="contextmenu">
        <v-contextmenu-item @click="openFile()">Open</v-contextmenu-item>
        <v-contextmenu-item v-if="clickedFile[2] == 'fil'" @click="downloadSpecificFile()"
          >Download</v-contextmenu-item
        >
        <v-contextmenu-item>Rename (mv command)</v-contextmenu-item>
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
          <v-contextmenu-item>MDA</v-contextmenu-item>
          <v-contextmenu-item>SDH 1</v-contextmenu-item>
        </v-contextmenu-submenu>
      </v-contextmenu>

      <!--
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
                      Mode
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Last modifed
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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      <button
                        @click="
                          writeToMeterpreterSession(
                            meterpreterCommands.FileSystemCommands.CD + ' ..'
                          )
                        "
                        class="bg-indigo-700"
                      >
                        Cd..
                      </button>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                  <tr
                    v-for="(row, rowIdx) in rows"
                    :key="row.email"
                    :class="rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ row[0] }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ row[1] }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ row[2] }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ row[3] }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ row[4] }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                    >
                      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      -->
      <!--
      <div v-for="info in sysinfo" class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">{{ info[0] }}</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ info[1] }}</dd>
      </div>

        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Email address</dt>
          <dd class="mt-1 text-sm text-gray-900">ricardocooper@example.com</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Salary expectation</dt>
          <dd class="mt-1 text-sm text-gray-900">$120,000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Phone</dt>
          <dd class="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
        </div>
        <div class="sm:col-span-2">
          <dt class="text-sm font-medium text-gray-500">About</dt>
          <dd class="mt-1 text-sm text-gray-900">
            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum
            culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla
            mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad
            adipisicing reprehenderit deserunt qui eu.
          </dd>
        </div>
        -->
    </dl>
  </div>
  <file-or-dir-props-modal></file-or-dir-props-modal>
  <file-deleting-modal></file-deleting-modal>
  <file-content-modal>></file-content-modal>
  <create-new-directory-modal></create-new-directory-modal>
</template>

<script setup>
import { ref, reactive, onBeforeMount, inject, watch } from "vue";
import SessionDataService from "../../../services/SessionDataService";
import { useRoute } from "vue-router";
import meterpreterCommands from "../../../constants/MeterpreterCommands";
import useEventsBus from "../../../composables/eventBus";
import FileOrDirPropsModal from "./fileSystem/FilePropsModal.vue";
import FileDeletingModal from "./fileSystem/FileDeletingModal.vue";
import FileContentModal from "./fileSystem/FileContentModal.vue";
import CreateNewDirectoryModal from "./fileSystem/CreateNewDirectoryModal.vue";
/*arrow-small-up*/
import { ArrowSmallUpIcon } from "@heroicons/vue/20/solid";
import ToastService from "../../../services/ToastService";

const $loading = inject("$loading");
const formContainer = ref(null);
const fullPage = ref(true);

const route = useRoute();
const currentSessionId = ref(route.params.id);
let meterpreterData = ref();
let rows = reactive([]);
let victimLwd = ref();
let clickedFile = ref();
const { bus, emit } = useEventsBus();

onBeforeMount(async () => {
  /*
   const responseAsArray = response.split("\n").splice(5);
      console.log(responseAsArray);

      responseAsArray.forEach((row) => {
        if (row) {
          let rowDetails = row.split("  ").filter((e) => e);
          rowDetails = rowDetails.map(function (e) {
            return e.trim();
          });
          rows.push(rowDetails);
        }
      });
      console.log(rows);
  */
  //console.log(meterpreterCommands.SystemCommands.SYSINFO);

  readFileSystemData();
});

async function changeClickedFile(row) {
  clickedFile.value = row;
}

async function readFileSystemData() {
  rows.splice(0);
  const fileSystemData = await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.LS
  );
  console.log(fileSystemData);
  processFileSystemData(fileSystemData);
  victimLwd.value = await writeToMeterpreterSession(
    meterpreterCommands.FileSystemCommands.GETWD
  );
  console.log(victimLwd.value);
}

async function processFileSystemData(data) {
  //rows.splice(0);
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
    // Optional parameters

    isFullPage: fullPage.value,
    container: formContainer.value,
  });
  //alert(command);
  //console.log(command);
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
      /*
      const rows = response.split("\n");
      console.log(rows);

      rows.forEach((info) => {
        let divider = info.split(":");
        sysinfo.push(divider);
      });
      console.log(sysinfo);
      */
      //meterpreterData.value = response;
      loader.hide();
    })
    .catch((err) => {
      console.log(err);
      loader.hide();
    });
}
//alert(meterpreterCommands.SystemCommands.SYSINFO);
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
  console.log(downloadInfo.split("[*] ")[2]);
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
    //alert(clickedFile.value[4]);
    writeToMeterpreterSession(command + " '" + clickedFile.value[4] + "'");

    ToastService.showToast(clickedFile.value[4] + " was deleted successfully");
  }
);

watch(
  () => bus.value.get("createNewDirectory"),
  async (val) => {
    const dirName = val[0].directory_name;

    const responseMessage = await createNewDirectory(dirName);
    console.log(responseMessage);
    if (responseMessage.includes("Operation failed"))
      ToastService.showToast(
        "Cannot create a file when that file already exists. ",
        "error"
      );
    else ToastService.showToast("Created " + dirName + " directory");
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
</script>
