<template>
  <NavbarComponent />
  <BreadcrumbComponent subpageName="Modules" />
  <h1>Modules view</h1>

  <main>
    <div class="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content
                <div class="px-4 py-4 sm:px-0">
                    <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
                 /End replace -->
      <ModulesTableComponent />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import ModulesTableComponent from "../components/ModulesTableComponent.vue";
import TestCom from "../components/TestCom.vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

export default defineComponent({
  name: "ModulesView",
  components: {
    NavbarComponent,
    BreadcrumbComponent,
    ModulesTableComponent,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
