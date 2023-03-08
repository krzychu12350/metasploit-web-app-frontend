<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="RPC Connections"
    /></template>
    <template v-slot:subpage-content>
      <RpcConnectionsTableComponent></RpcConnectionsTableComponent>
      <RpcConnectionDeletingModal></RpcConnectionDeletingModal>
    </template>
  </ViewBaseComponent>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import RpcConnectionsTableComponent from "../components/rpc_connections/RpcConnectionsTableComponent.vue";
import RpcConnectionDeletingModal from "../components/rpc_connections/RpcConnectionDeletingModal.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
</script>

<style scoped></style>
