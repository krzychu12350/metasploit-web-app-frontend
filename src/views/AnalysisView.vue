<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="Analysis"
    /></template>
    <template v-slot:subpage-content> </template>
  </ViewBaseComponent>
</template>

<script setup>
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
</script>
