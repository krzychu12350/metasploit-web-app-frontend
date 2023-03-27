<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="Dashboard"
    /></template>
    <template v-slot:subpage-content>
      <CoreStatsComponent class="mb-4"></CoreStatsComponent>
      <ModuleStatsComponent />
    </template>
  </ViewBaseComponent>
</template>
<script setup>
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import ModuleStatsComponent from "../components/ModuleStatsComponent.vue";
import CoreStatsComponent from "../components/CoreStatsComponent.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
</script>
