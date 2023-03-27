<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent :subpageName="'Session ' + currentSessionId"
    /></template>
    <template v-slot:subpage-content>
      <div
        class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-1"
      >
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <section aria-labelledby="applicant-information-title">
            <div class="bg-white shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <session-workspace-tabs></session-workspace-tabs>
              </div>
              <component :is="selected"></component>
            </div>
          </section>
        </div>
      </div>
    </template>
  </ViewBaseComponent>
</template>

<script setup>
import { watch, onBeforeMount, ref, shallowRef } from "vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import SessionWorkspaceTabs from "../components/sessions/SessionWorkspaceTabs.vue";
import SystemInfoComponent from "../components/sessions/sessionInteract/SystemInfoComponent.vue";
import NetworkComponent from "../components/sessions/sessionInteract/NetworkInfoComponent.vue";
import UserInterfaceComponent from "../components/sessions/sessionInteract/userInterface/UserInterfaceComponent.vue";
import FileSystemComponent from "../components/sessions/sessionInteract/fileSystem/victim/VictimFileSystemComponent.vue";
import ProcessesComponent from "../components/sessions/sessionInteract/processes/ProcessesComponent.vue";
import PowerComponent from "../components/sessions/sessionInteract/PowerComponent.vue";

import useEventsBus from "../composables/eventBus";
import { useRoute } from "vue-router";

const route = useRoute();
let selected = shallowRef(SystemInfoComponent);
const { bus } = useEventsBus();

let meterpreterData = ref({});
const currentSessionId = ref(route.params.id);

watch(
  () => bus.value.get("setActiveTab"),
  (tab) => {
    let componentName = tab[0].tab_name + "Component".replace(/\s/g, "");
    changeSelectedComponent(componentName);
  }
);

function changeSelectedComponent(componentName) {
  if (componentName == "SystemInfoComponent") selected.value = SystemInfoComponent;
  else if (componentName == "NetworkComponent") selected.value = NetworkComponent;
  else if (componentName == "UserInterfaceComponent")
    selected.value = UserInterfaceComponent;
  else if (componentName == "FileSystemComponent") selected.value = FileSystemComponent;
  else if (componentName == "ProcessesComponent") selected.value = ProcessesComponent;
  else if (componentName == "PowerComponent") selected.value = PowerComponent;
}
</script>
