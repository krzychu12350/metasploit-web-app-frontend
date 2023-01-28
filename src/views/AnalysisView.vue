<template>
  <!--
  <main class="flex flex-col">
    <div>
      <NavbarComponent />
      <BreadcrumbComponent subpageName="Analysis" />
    </div>

    <div>
      <BottomTabsComponent></BottomTabsComponent>

      <TerminalComponent></TerminalComponent>
    </div>
  </main>
  -->
  <!-- skelet of app -->
  <div class="w-screen h-screen">
    <div class="flex flex-col justify-between h-full">
      <div><NavbarComponent /> <BreadcrumbComponent subpageName="Analysis" /></div>
      <div>
        <ScannedHostsComponent></ScannedHostsComponent>
      </div>
      <div class="bg-black">
        <BottomTabsComponent></BottomTabsComponent>
        <div class="h-80 min-h-80 overflow-y-auto">
          <TerminalComponent class="overflow-hidden"></TerminalComponent>
        </div>
      </div>
    </div>
  </div>
  <host-details-modal-component></host-details-modal-component>
</template>

<script setup>
import NavbarComponent from "../components/NavbarComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import TerminalComponent from "../components/TerminalComponent.vue";
import ToastService from "../services/ToastService";
import BottomTabsComponent from "../components/BottomTabsComponent.vue";
import ScannedHostsComponent from "../components/ScannedHostsComponent.vue";
import HostDetailsModalComponent from "../components/hosts/HostDetailsModalComponent.vue";

/*
export default {
  name: "AnalysisView",
  components: {
    NavbarComponent,
    BreadcrumbComponent,
    TerminalComponent,
    BottomTabsComponent,
  },
  setup() {
    return {};
  },
  mounted() {},
  methods: {
    test() {
      //alert("dziala");
      console.log("jebaccccccccccccc");
    },
  },
};
*/
</script>

<style scoped></style>
