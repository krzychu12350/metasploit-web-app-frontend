<template>
  <div class="px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div v-for="info in sysinfo" class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">{{ info[0] }}</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ info[1] }}</dd>
      </div>
      <!--
      <div class="sm:col-span-1">
        <dd v-for="row in victimLocalDatetime" class="mt-1 text-sm text-gray-900">
          <dt class="text-sm font-medium text-gray-500">{{ row[0] }}</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ row[1] }}</dd>
        </dd>
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
</template>

<script setup>
import { inject, ref, reactive, onBeforeMount, onMounted } from "vue";
import SessionDataService from "../../../services/SessionDataService";
import { useRoute } from "vue-router";
import meterpreterCommands from "../../../constants/MeterpreterCommands";
import useMeterpreterSession from "../../../composables/meterpreterSession";

const route = useRoute();
const currentSessionId = ref(route.params.id);
let meterpreterData = ref({});
let sysinfo = ref([]);
let victimLocalDatetime = ref([]);
const $loading = inject("$loading");
const fullPage = ref(false);

const {
  writeToMeterpreter,
  readFromMeterpreter,
  processTextDataToArray,
} = useMeterpreterSession();

async function requestLocalDataTime() {
  return writeToMeterpreter(
    currentSessionId.value,
    meterpreterCommands.SystemCommands.LOCALTIME
  );
}

async function readLocalDataTime() {
  const localDataTime = await readFromMeterpreter(currentSessionId.value);
  victimLocalDatetime.value = await processTextDataToArray(localDataTime);
}

async function requestSystemInfo() {
  return writeToMeterpreter(
    currentSessionId.value,
    meterpreterCommands.SystemCommands.SYSINFO
  );
}

async function readSystemInfo() {
  const loader = $loading.show();

  const systemInfoData = await readFromMeterpreter(currentSessionId.value);
  setTimeout(async () => {
    sysinfo.value = await processTextDataToArray(systemInfoData);
  }, 100);

  loader.hide();
  /*
  const rows = systemInfo.data.data.split("\n");
  console.log(rows);

  rows.forEach((info) => {
    let divider = info.split(":");
    sysinfo.push(divider);
  });
  */
}

onMounted(async () => {
  await requestSystemInfo();
  await readSystemInfo();

  //await requestLocalDataTime();
  //await readLocalDataTime();

  //victimLocalDatetime.value = localDateTimeResponse.data.data;
});
</script>
