<template>
  <!--
  <NavbarComponent />
  <BreadcrumbComponent subpageName="Modules" />

  <main>
    <div class="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
  
      <ModulesTableComponent />
    </div>
  </main>
-->
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

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
</script>

<style scoped></style>
