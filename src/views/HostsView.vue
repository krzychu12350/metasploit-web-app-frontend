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
</template>

<script setup>
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
import ScannedHostsComponent from "../components/ScannedHostsComponent.vue";
import HostDetailsModalComponent from "../components/hosts/HostDetailsModalComponent.vue";
import ActionsTabComponent from "../components/hosts/ActionsTabComponent.vue";
import HostAddingModalComponent from "../components/hosts/HostAddingModalComponent.vue";
</script>

<style scoped></style>
