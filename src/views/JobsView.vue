<template>
  <NavbarComponent />
  <BreadcrumbComponent />
  <JobsTableComponent></JobsTableComponent>
  <JobKillingModal></JobKillingModal>
  <!--
  <h1>Jobs view</h1>
  <div v-for="job in jobs">
    <p>{{ job }}</p>
  </div>
  -->
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import JobsTableComponent from "../components/jobs/JobsTableComponent.vue";
import JobKillingModal from "../components/jobs/JobKillingModal.vue";
</script>

<style scoped></style>
