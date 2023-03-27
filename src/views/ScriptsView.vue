<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="Scripts"
    /></template>
    <template v-slot:subpage-content>
      <ScriptsTableComponent></ScriptsTableComponent>
      <CreatingNewScriptModal></CreatingNewScriptModal>
      <ScriptDeletingModal></ScriptDeletingModal>
      <EditingScriptModal></EditingScriptModal>
      <ScriptDetailsModal></ScriptDetailsModal>
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
import ScriptsTableComponent from "../components/scripts/ScriptsTableComponent.vue";
import ScriptDeletingModal from "../components/scripts/ScriptDeletingModal.vue";
import CreatingNewScriptModal from "../components/scripts/CreatingNewScriptModal.vue";
import EditingScriptModal from "../components/scripts/EditingScriptModal.vue";
import ScriptDetailsModal from "../components/scripts/ScriptDetailsModal.vue";
</script>
