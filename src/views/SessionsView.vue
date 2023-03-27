<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="Sessions"
    /></template>
    <template v-slot:subpage-content>
      <SessionsTableComponent></SessionsTableComponent>
      <SessionKillingModal></SessionKillingModal>
    </template>
  </ViewBaseComponent>
</template>
<script setup>
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
import SessionsTableComponent from "../components/sessions/SessionsTableComponent.vue";
import SessionKillingModal from "../components/sessions/SessionKillingModal.vue";
</script>
