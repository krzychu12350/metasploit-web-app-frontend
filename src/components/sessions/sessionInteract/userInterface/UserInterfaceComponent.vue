<template>
  <div class="px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <dt class="text-sm font-medium text-gray-500">User interface</dt>
      <dd class="flex flex-col whitespace-pre">
        <button-component
          name="START KEYLOGGING"
          v-tooltip.top="'Start capturing keystrokes'"
          @click="startKeylogging()"
        ></button-component>
        <button-component
          name="STOP KEYLOGGING"
          v-tooltip.top="'Stop capturing keystrokes'"
          @click="stopKeylogging()"
        ></button-component>
        <button-component
          name="DUMP KEYLOGGING"
          v-tooltip.top="'Dump the keystroke buffer'"
          @click="dumpKeylogging()"
        ></button-component>
        <button-component
          name="USER IDLE TIME"
          v-tooltip.top="'Get the time during the remote user has been idle'"
          @click="showUserIdleTime()"
        ></button-component>
      </dd>
    </dl>
  </div>
  <mouse-keyboard-control-modal></mouse-keyboard-control-modal>
  <sending-keyboard-event-modal></sending-keyboard-event-modal>
  <sending-mouse-event-modal></sending-mouse-event-modal>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import meterpreterCommands from "../../../../constants/MeterpreterCommands";
import ButtonComponent from "../../../ButtonComponent.vue";
import useMeterpreterSession from "../../../../composables/meterpreterSession";
import ToastService from "../../../../services/ToastService";
import useEventsBus from "../../../../composables/eventBus";

const { writeToMeterpreter, readFromMeterpreter } = useMeterpreterSession();
const route = useRoute();
const currentSessionId = ref(route.params.id);
let meterpreterData = ref();
let sysinfo = reactive([]);
const { emit } = useEventsBus();

async function requestKeyloggingStart() {
  return writeToMeterpreter(
    currentSessionId.value,
    meterpreterCommands.UserInterfaceCommands.KEYSCAN_START
  );
}

async function keyloggingStartRequestResult() {
  return readFromMeterpreter(currentSessionId.value);
}

async function startKeylogging() {
  await requestKeyloggingStart();
  const response = await keyloggingStartRequestResult();
  ToastService.showToast(response.data.data);
}

async function requestKeyloggingStop() {
  return writeToMeterpreter(
    currentSessionId.value,
    meterpreterCommands.UserInterfaceCommands.KEYSCAN_STOP
  );
}

async function keyloggingStopRequestResult() {
  return readFromMeterpreter(currentSessionId.value);
}

async function stopKeylogging() {
  await requestKeyloggingStop();
  const response = await keyloggingStopRequestResult();
  ToastService.showToast(response.data.data);
}

async function requestKeyloggingDump() {
  return writeToMeterpreter(
    currentSessionId.value,
    meterpreterCommands.UserInterfaceCommands.KEYSCAN_DUMP
  );
}

async function keyloggingDumpRequestResult() {
  return readFromMeterpreter(currentSessionId.value);
}

async function dumpKeylogging() {
  await requestKeyloggingDump();
  const response = await keyloggingDumpRequestResult();
  const stringDump = response.data.data;
  await saveKeylogginDumpingToFile(stringDump.slice(35, stringDump.length));
  ToastService.showToast(stringDump.slice(0, 30));
}

async function requestShowingUserIdleTime() {
  return writeToMeterpreter(
    currentSessionId.value,
    meterpreterCommands.UserInterfaceCommands.IDLETIME
  );
}

async function showingUserIdleTimeRequestResult() {
  return readFromMeterpreter(currentSessionId.value);
}

async function showUserIdleTime() {
  await requestShowingUserIdleTime();
  const response = await showingUserIdleTimeRequestResult();
  console.log(response);
  ToastService.showToast(response.data.data);
}

async function saveKeylogginDumpingToFile(content) {
  const link = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  link.download = "keyboard_dump.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}
</script>
