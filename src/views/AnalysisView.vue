<template>
  <NavbarComponent />
  <BreadcrumbComponent subpageName="Analysis" />

  <div class="fixed bottom-0 min-w-full">
    <BottomTabsComponent></BottomTabsComponent>
    <TerminalComponent></TerminalComponent>
  </div>
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
