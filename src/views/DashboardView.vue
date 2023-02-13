<template>
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="Dashboard"
    /></template>
    <template v-slot:subpage-content>
      <ModuleStatsComponent />
      <ModulesSearchEngineComponent></ModulesSearchEngineComponent>
    </template>
  </ViewBaseComponent>
  <!--
  <div class="min-h-full">
    <NavbarComponent />
    <BreadcrumbComponent subpageName="Dashboard" />

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ModuleStatsComponent />
        <ModulesSearchEngineComponent></ModulesSearchEngineComponent>
        <RunModuleModalComponent></RunModuleModalComponent>
      </div>
    </main>
  </div>
--></template>
<script setup>
import { onMounted } from "vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import ActionsComponent from "../components/ActionsComponent.vue";
import ModulesSearchEngineComponent from "../components/modules/ModulesSearchEngineComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import ConsoleDataService from "../services/ConsoleDataService";
import ModuleStatsComponent from "../components/ModuleStatsComponent.vue";
import AuthService from "../services/AuthDataService";
import ToastService from "../services/ToastService";
import AlgoliaInstantSearch from "../components/modules/AlgoliaInstantSearch.vue";
import RunModuleModalComponent from "../components/modules/RunModuleModalComponent.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";

function test() {
  //ToastService.showToast("test", "default");
  AuthService.tokenList().then((res) => {
    console.log(res.data);
    return res.data;
  });
}
onMounted(() => {
  test();
});
/*
export default {
  name: "Dashboard",
  components: {
    NavbarComponent,
    BreadcrumbComponent,
    ActionsComponent,
    SessionsComponent,
    ModuleStatsComponent,
  },
  setup() {
    return {};
  },
  created() {
    this.test();
  },
  methods: {
    test() {
      ToastService.showToast("test", "default");
      AuthService.tokenList().then((res) => {
        console.log(res.data);
        return res.data;
      });
    },
  },
};
*/
</script>
