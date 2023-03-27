<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="Workspaces"
    /></template>
    <template v-slot:subpage-content>
      <WorkspacesTableComponent></WorkspacesTableComponent>
      <WorkspaceDeletingModal></WorkspaceDeletingModal>
      <WorkspaceAddingModalComponentVue></WorkspaceAddingModalComponentVue>
      <WorkspaceEditingModalComponent></WorkspaceEditingModalComponent>
    </template>
  </ViewBaseComponent>
</template>

<script setup>
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import WorkspacesTableComponent from "../components/workspaces/WorkspacesTableComponent.vue";
import WorkspaceDeletingModal from "../components/workspaces/WorkspaceDeletingModal.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
import WorkspaceAddingModalComponentVue from "../components/workspaces/WorkspaceAddingModalComponent.vue";
import WorkspaceEditingModalComponent from "../components/workspaces/WorkspaceEditingModalComponent.vue";
</script>
