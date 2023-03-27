<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header> <BreadcrumbComponent subpageName="Jobs" /></template>
    <template v-slot:subpage-content>
      <JobsTableComponent></JobsTableComponent>
      <JobKillingModal></JobKillingModal>
    </template>
  </ViewBaseComponent>
</template>

<script setup>
import NavbarComponent from "../components/NavbarComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import JobsTableComponent from "../components/jobs/JobsTableComponent.vue";
import JobKillingModal from "../components/jobs/JobKillingModal.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
</script>

<style scoped></style>
