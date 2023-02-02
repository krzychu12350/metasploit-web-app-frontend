<template>
  <div class="min-h-full">
    <NavbarComponent />
    <BreadcrumbComponent subpageName="Dashboard" />
    <!--
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 class="text-lg leading-6 font-semibold text-gray-900">Dashboard</h1>
            </div>
        </header>
        -->
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content
                <div class="px-4 py-4 sm:px-0">
                    <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
                 /End replace -->
        <ModuleStatsComponent />
        <ModulesSearchEngineComponent></ModulesSearchEngineComponent>
        <AlgoliaInstantSearch></AlgoliaInstantSearch>
      </div>
    </main>
  </div>
</template>
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
