<template>
  <div class="px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div v-for="info in sysinfo" class="sm:col-span-1">
        <dt class="text-sm font-medium text-gray-500">{{ info[0] }}</dt>
        <dd class="mt-1 text-sm text-gray-900">{{ info[1] }}</dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { inject, ref, reactive, onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";
import meterpreterCommands from "../../../constants/MeterpreterCommands";
import useMeterpreterSession from "../../../composables/meterpreterSession";

const route = useRoute();
const currentSessionId = ref(route.params.id);
let sysinfo = ref([]);
const $loading = inject("$loading");

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
async function requestSystemInfo() {
  return writeToMeterpreter(
    currentSessionId.value,
    meterpreterCommands.SystemCommands.SYSINFO
  );
}

async function readSystemInfo() {
  const loader = $loading.show();
  const systemInfoData = await readFromMeterpreter(currentSessionId.value);
  sysinfo.value = processTextDataToArray(systemInfoData);
  loader.hide();
}

onMounted(async () => {
  await requestSystemInfo();
  await readSystemInfo();
});
</script>
