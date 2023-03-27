<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="Modules"
    /></template>
    <template v-slot:subpage-content>
      <ModulesTableComponent></ModulesTableComponent>
    </template>
  </ViewBaseComponent>
</template>

<script setup>
import { defineComponent } from "vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import ModulesTableComponent from "../components/modules/ModulesTableComponent.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
</script>
