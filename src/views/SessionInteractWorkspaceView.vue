<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent :subpageName="'Session ' + currentSessionId"
    /></template>
    <template v-slot:subpage-content>
      <!--
     
   
      <p class="text-black">
        {{ meterpreterData }}
      </p>
      -->
      <div
        class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-1"
      >
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <!-- Description list-->
          <section aria-labelledby="applicant-information-title">
            <div class="bg-white shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <!--
                <h2
                  id="applicant-information-title"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  Applicant Information
                </h2>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and application.
                </p>
                -->
                <session-workspace-tabs></session-workspace-tabs>
              </div>
              <!-- <system-info-component></system-info-component> -->

              <component :is="selected"></component>
            </div>
          </section>
        </div>
      </div>
    </template>
  </ViewBaseComponent>
</template>

<script setup>
import { watch, reactive, onBeforeMount, ref, computed, shallowRef } from "vue";
import SessionDataService from "../services/SessionDataService";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import SessionWorkspaceTabs from "../components/sessions/SessionWorkspaceTabs.vue";
import SystemInfoComponent from "../components/sessions/sessionInteract/SystemInfoComponent.vue";
import NetworkComponent from "../components/sessions/sessionInteract/NetworkInfoComponent.vue";
import MeterpreterSessionComponents from "../constants/MeterpreterSessionComponents";
import UserInterfaceComponent from "../components/sessions/sessionInteract/userInterface/UserInterfaceComponent.vue";
import FileSystemComponent from "../components/sessions/sessionInteract/fileSystem/victim/VictimFileSystemComponent.vue";
import ProcessesComponent from "../components/sessions/sessionInteract/processes/ProcessesComponent.vue";
import PowerComponent from "../components/sessions/sessionInteract/PowerComponent.vue";

import { defineAsyncComponent } from "vue";
import useEventsBus from "../composables/eventBus";
import { useRoute } from "vue-router";

const route = useRoute();
let selected = shallowRef(SystemInfoComponent);
const { bus } = useEventsBus();

let meterpreterData = ref({});
const currentSessionId = ref(route.params.id);

onBeforeMount(() => {
  /*
  SessionDataService.meterpreterWrite({
    session_id: currentSessionId.value,
    ps: "ipconfig",
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  SessionDataService.meterpreterRead({
    session_id: currentSessionId.value,
  })
    .then((res) => {
      console.log(res.data);
      meterpreterData.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
    */
});
/*
const changeSelectedComponent = computed((componentName) => {
  return MeterpreterSessionComponents[componentName];
});
*/
watch(
  () => bus.value.get("setActiveTab"),
  (tab) => {
    /*
    // make a new parser
    const parser = new DOMParser();
    selected.value = parser.parseFromString(
      tab[0].tab_name + "Component".replace(/\s/g, ""),
      "text/html"
    );
    */
    let componentName = tab[0].tab_name + "Component".replace(/\s/g, "");
    console.log(componentName);
    changeSelectedComponent(componentName);
    //selected.value = componentName;
    //selected.value = NetworkComponent;
    /*
  
    selected ==
      computed(() => {
        return NetworkComponent;
      });
      */
    //selected = MeterpreterSessionComponents[componentName];
    /*
    selected = defineAsyncComponent(() => {
      return MeterpreterSessionComponents[componentName];
    });
    */
    //changeStep(componentName);
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
