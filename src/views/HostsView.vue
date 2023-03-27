<template>
  <!--
  <NavbarComponent />
  <BreadcrumbComponent />

  <JobsTableComponent></JobsTableComponent>
  <JobKillingModal></JobKillingModal>

  <h1>Jobs view</h1>
  <div v-for="job in jobs">
    <p>{{ job }}</p>
  </div>
  -->

  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="Hosts" />
      <div class="flex justify-center py-4">
        <ActionsTabComponent></ActionsTabComponent>
      </div>
    </template>
    <template v-slot:subpage-content>
      <div class="">
        <ScannedHostsComponent></ScannedHostsComponent>
      </div>
    </template>
  </ViewBaseComponent>
  <host-details-modal-component></host-details-modal-component>
  <host-adding-modal-component></host-adding-modal-component>
  <msf-tcp-port-scanner-modal-component></msf-tcp-port-scanner-modal-component>
  <importing-data-modal-component>></importing-data-modal-component>
  <exporting-data-modal-component></exporting-data-modal-component>
  <nmap-scan-modal-component></nmap-scan-modal-component>
  <host-servcies-modal-component></host-servcies-modal-component>
</template>

<script setup>
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
import ScannedHostsComponent from "../components/ScannedHostsComponent.vue";
import HostDetailsModalComponent from "../components/hosts/HostDetailsModalComponent.vue";
import ActionsTabComponent from "../components/hosts/ActionsTabComponent.vue";
import HostAddingModalComponent from "../components/hosts/HostAddingModalComponent.vue";
import MsfTcpPortScannerModalComponent from "../components/hosts/MsfTcpPortScannerModalComponent.vue";
import ImportingDataModalComponent from "../components/hosts/ImportingDataModalComponent.vue";
import ExportingDataModalComponent from "../components/hosts/ExportingDataModalComponent.vue";
import NmapScanModalComponent from "../components/hosts/NmapScanModalComponent.vue";
import HostServciesModalComponent from "../components/hosts/HostServciesModalComponent.vue";
</script>

<style scoped></style>
