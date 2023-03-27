<template>
  <div class="px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-y-8 sm:grid-cols-2">
      <div>
        <button-component
          @click="writeToMeterpreterSession('ARP')"
          v-tooltip.top="'Display the host ARP cache'"
          name="ARP"
        ></button-component>
        <button-component
          @click="writeToMeterpreterSession('GETPROXY')"
          v-tooltip.top="'Display the current proxy configuration'"
          name="GETPROXY"
        ></button-component>
        <button-component
          @click="writeToMeterpreterSession('IPCONFIG')"
          v-tooltip.top="'Display interfaces'"
          name="IPCONFIG"
        ></button-component>
        <button-component
          @click="writeToMeterpreterSession('NETSTAT')"
          v-tooltip.top="'Display the network connections'"
          name="NETSTAT"
        ></button-component>
        <button-component
          @click="writeToMeterpreterSession('ROUTE')"
          v-tooltip.top="'View and modify the routing table'"
          name="ROUTE"
        ></button-component>
      </div>

      <div ref="formContainer" class="whitespace-pre-wrap p-8 bg-gray-50 rounded-lg">
        <p class="text-gray-800">
          {{ meterpreterData }}
        </p>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { inject, ref, reactive, onBeforeMount } from "vue";
import SessionDataService from "../../../services/SessionDataService";
import { useRoute } from "vue-router";
import meterpreterCommands from "../../../constants/MeterpreterCommands";
import ButtonComponent from "../../ButtonComponent.vue";

const $loading = inject("$loading");
const fullPage = ref(false);
const formContainer = ref(null);

const route = useRoute();
const currentSessionId = ref(route.params.id);
let meterpreterData = ref();
let sysinfo = reactive([]);

onBeforeMount(() => {
  writeToMeterpreterSession("ARP");
});

function writeToMeterpreterSession(command) {
  const loader = $loading.show({
    isFullPage: fullPage.value,
    container: formContainer.value,
  });

  const data = {
    session_id: currentSessionId.value,
    ps: meterpreterCommands.NetworkingCommands[command],
  };

  SessionDataService.meterpreterWrite(data)
    .then((res) => {})
    .catch((err) => {
      loader.hide();
      console.log(err);
    });

  readFromMeterpreterSession(loader);
}

function readFromMeterpreterSession(loader) {
  SessionDataService.meterpreterRead({
    session_id: currentSessionId.value,
  })
    .then((res) => {
      const response = res.data.data.data;
      meterpreterData.value = response;
      loader.hide();
    })
    .catch((err) => {
      console.log(err);
      loader.hide();
    });
}
</script>
