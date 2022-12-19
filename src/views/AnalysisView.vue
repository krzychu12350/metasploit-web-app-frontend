<template>
  <NavbarComponent />
  <BreadcrumbComponent subpageName="Analysis" />

  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <TerminalComponent></TerminalComponent>
  </div>

  <footer
    class="w-full h-40 bg-indigo-600 border-t-2 border-white fixed left-0 bottom-0 flex justify-center items-center"
  >
    <BottomTabsComponent></BottomTabsComponent>
  </footer>
</template>

<script>
import NavbarComponent from "../components/NavbarComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import TerminalComponent from "../components/TerminalComponent.vue";
import ToastService from "../services/ToastService";
import BottomTabsComponent from "../components/BottomTabsComponent.vue";
export default {
  name: "AnalysisView",
  components: {
    NavbarComponent,
    BreadcrumbComponent,
    TerminalComponent,
    BottomTabsComponent,
  },
  setup() {
    return {};
  },
  mounted() {},
  methods: {
    test() {
      //alert("dziala");
      console.log("jebaccccccccccccc");
    },
  },
};
</script>

<style scoped></style>
