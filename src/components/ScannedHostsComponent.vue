<template>
  <!--<h1 class="text-center">scanned hosts</h1>-->

  <div class="flex gap-4 justify-center">
    <div v-for="host in scannedHosts" class="single-host relative inline-block text-left">
      <ComputerDesktopIcon
        class="flex-shrink-0 h-25 w-25"
        aria-hidden="true"
        @click.right="changeClickedHost(host)"
        v-contextmenu:contextmenu
      />
      <div class="flex flex-col text-center">
        <p>{{ host.address }}</p>
        <p>{{ host.mac }}</p>
        <p>{{ host.os_name }}</p>
      </div>
    </div>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item
        @click="emit('showHostDetailsModal', { host: changeClickedHost.value })"
        >More info</v-contextmenu-item
      >
      <v-contextmenu-item>Services</v-contextmenu-item>
      <!--
      <v-contextmenu-submenu title="Attack">
        <v-contextmenu-item>Menu Item 2.1</v-contextmenu-item>

        <v-contextmenu-submenu title="Menu Item 2.2">
          <v-contextmenu-item>Menu Item 2.2.1</v-contextmenu-item>
          <v-contextmenu-item>Menu Item 2.2.2</v-contextmenu-item>
        </v-contextmenu-submenu>
     
      </v-contextmenu-submenu>
      -->
      <v-contextmenu-item @click="emit('deleteHost', { host: changeClickedHost.value })"
        >Remove</v-contextmenu-item
      >
    </v-contextmenu>
  </div>
</template>
<script setup>
import { inject, onBeforeMount, ref, watch } from "vue";
import DatabaseDataService from "../services/DatabaseDataService";
import { ComputerDesktopIcon } from "@heroicons/vue/24/solid";
import useEventsBus from "../composables/eventBus";
import ActionsTabComponent from "./hosts/ActionsTabComponent.vue";
import { useMsfCurrentWorkspace } from "../stores/useMsfCurrentWorkspace";

const { bus, emit } = useEventsBus();
const clickedHostId = ref();
const scannedHosts = ref();
const useMsfWorkspace = useMsfCurrentWorkspace();
let workspaces = ref([]);
const $loading = inject("$loading");

onBeforeMount(async () => {
  await getAllWorkspaces();
  const currentWorkspaceName = await useMsfWorkspace.getCurrentWorkspace;
  //alert(currentWorkspaceName);
  const currentWorkspace = workspaces.value.find((w) => w.name === currentWorkspaceName);
  //alert(currentWorkspace.id);
  await fetchAllHosts(currentWorkspace.id);
});

async function getAllWorkspaces() {
  return DatabaseDataService.getWorkspaces()
    .then((res) => {
      //console.log(res.data.workspaces);
      workspaces.value = res.data.workspaces;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function fetchAllHosts(workspaceId) {
  const loader = $loading.show();
  DatabaseDataService.getAllScannedHosts(workspaceId)
    .then((res) => {
      scannedHosts.value = res.data.data;
      console.log(scannedHosts.value);
      loader.hide();
    })
    .catch((err) => {
      loader.hide();
      console.log(err);
    });
}

function changeClickedHost(hostId) {
  changeClickedHost.value = hostId;
}

watch(
  () => bus.value.get("refreshHosts"),
  async () => {
    const currentWorkspaceName = await useMsfWorkspace.getCurrentWorkspace;
    //alert(currentWorkspaceName);
    const currentWorkspace = workspaces.value.find(
      (w) => w.name === currentWorkspaceName
    );
    await fetchAllHosts(currentWorkspace.id);
  }
);
</script>
