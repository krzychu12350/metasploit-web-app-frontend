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
      <BreadcrumbComponent subpageName="Workspaces"
    /></template>
    <template v-slot:subpage-content>
      <WorkspacesTableComponent></WorkspacesTableComponent>
      <WorkspaceDeletingModal></WorkspaceDeletingModal>
      <WorkspaceAddingModalComponentVue></WorkspaceAddingModalComponentVue>
    </template>
  </ViewBaseComponent>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import WorkspacesTableComponent from "../components/workspaces/WorkspacesTableComponent.vue";
import WorkspaceDeletingModal from "../components/workspaces/WorkspaceDeletingModal.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
import WorkspaceAddingModalComponentVue from "../components/workspaces/WorkspaceAddingModalComponent.vue";
</script>

<style scoped></style>
