<template>
  <h1 class="text-center">scanned hosts</h1>
  <div class="flex gap-4 justify-center">
    <div v-for="host in scannedHosts" class="single-host relative inline-block text-left">
      <ComputerDesktopIcon
        class="flex-shrink-0 h-25 w-25"
        aria-hidden="true"
        @click.right="changeClickedHostId(host.id)"
        v-contextmenu:contextmenu
      />
      <div class="flex flex-col text-center">
        <p>{{ host.id }}</p>
        <p>{{ host.address }}</p>
        <p>{{ host.os_name }}</p>
      </div>
    </div>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item
        @click="emit('showHostDetailsModal', { host_id: changeClickedHostId.value })"
        >More info</v-contextmenu-item
      >
      <v-contextmenu-item>Services</v-contextmenu-item>

      <v-contextmenu-submenu title="Attack">
        <v-contextmenu-item>Menu Item 2.1</v-contextmenu-item>

        <v-contextmenu-submenu title="Menu Item 2.2">
          <v-contextmenu-item>Menu Item 2.2.1</v-contextmenu-item>
          <v-contextmenu-item>Menu Item 2.2.2</v-contextmenu-item>
        </v-contextmenu-submenu>
        <!--
        <v-contextmenu-item disabled>黄瓜</v-contextmenu-item>
        -->
      </v-contextmenu-submenu>
    </v-contextmenu>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import DatabaseDataService from "../services/DatabaseDataService";
import { ComputerDesktopIcon } from "@heroicons/vue/24/solid";
import useEventsBus from "../composables/eventBus";

const { emit } = useEventsBus();
const clickedHostId = ref();
const scannedHosts = ref();

onBeforeMount(() => {
  DatabaseDataService.getAllScannedHosts().then((res) => {
    //console.log(res.data);
    scannedHosts.value = res.data.data;
    console.log(scannedHosts.value);
  });
});

function changeClickedHostId(hostId) {
  changeClickedHostId.value = hostId;
}
</script>
