<template>
  <div class="px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <dt class="text-sm font-medium text-gray-500">System power</dt>
      <dd class="flex flex-col whitespace-pre">
        <button-component
          name="REBOOT"
          v-tooltip.top="'Reboots the remote computer'"
          @click="rebootVictimMachine()"
        ></button-component>
        <button-component
          name="SHUTDOWN"
          v-tooltip.top="'Shuts down the remote computer'"
          @click="shutdownVictimMachine()"
        ></button-component>
      </dd>
    </dl>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import meterpreterCommands from "../../../constants/MeterpreterCommands";
import ButtonComponent from "../../ButtonComponent.vue";
import useMeterpreterSession from "../../../composables/meterpreterSession";
import ToastService from "../../../services/ToastService";

const { writeToMeterpreter, readFromMeterpreter } = useMeterpreterSession();

const route = useRoute();
const currentSessionId = ref(route.params.id);

async function requestShutdownVictimMachine() {
  return writeToMeterpreter(
    currentSessionId.value,
    meterpreterCommands.SystemCommands.SHUTDOWN
  );
}

async function victimMachineShutdowningResult() {
  return readFromMeterpreter(currentSessionId.value);
}

async function requestRebootVictimMachine() {
  return writeToMeterpreter(
    currentSessionId.value,
    meterpreterCommands.SystemCommands.REBOOT
  );
}

async function victimMachineRebootingResult() {
  return readFromMeterpreter(currentSessionId.value);
}

async function shutdownVictimMachine() {
  await requestShutdownVictimMachine();
  const response = await victimMachineShutdowningResult();
  console.log(response.data);
  route.push("/sessions");
  ToastService.showToast(response.data.data);
}

async function rebootVictimMachine() {
  await requestRebootVictimMachine();
  const response = await victimMachineRebootingResult();
  route.push("/sessions");
  console.log(response.data);
  ToastService.showToast(response.data.data);
}
</script>
