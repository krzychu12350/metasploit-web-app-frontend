<template>
  <div class="px-4 py-5 sm:px-6">
    <dl class="grid grid-cols-1 gap-y-8 sm:grid-cols-2">
      <!--<dt class="text-sm font-medium text-gray-500">Network info</dt>-->
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

      <div ref="formContainer" class="whitespace-pre">
        {{ meterpreterData }}
      </div>

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
  //console.log(meterpreterCommands.SystemCommands.SYSINFO);
  writeToMeterpreterSession("ARP");
});

function writeToMeterpreterSession(command) {
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
    ps: meterpreterCommands.NetworkingCommands[command],
  };
  console.log(data);
  SessionDataService.meterpreterWrite(data)
    .then((res) => {
      console.log(res.data);
    })
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
      console.log(res.data);
      const response = res.data.data.data;
      console.log(response);
      /*
      const rows = response.split("\n");
      console.log(rows);

      rows.forEach((info) => {
        let divider = info.split(":");
        sysinfo.push(divider);
      });
      console.log(sysinfo);
      */
      meterpreterData.value = response;
      loader.hide();
    })
    .catch((err) => {
      console.log(err);
      loader.hide();
    });
}
//alert(meterpreterCommands.SystemCommands.SYSINFO);
</script>
