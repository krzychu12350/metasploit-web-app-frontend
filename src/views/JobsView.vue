<template>
  <NavbarComponent />
  <BreadcrumbComponent />
  <h1>Jobs view</h1>
  <div v-for="job in jobs">
    <p>{{ job }}</p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import JobDataService from "../services/JobDataService";
/*
export default defineComponent({
  name: "JobsView",
  components: {
    NavbarComponent,
    BreadcrumbComponent,
  },
  setup() {
    return {};
  },
});
*/
const jobs = ref();

onBeforeMount(() => {
  JobDataService.list().then((res) => {
    //console.log(res.data);
    jobs.value = res.data.data;
    console.log(jobs.value);
  });
});
</script>

<style scoped></style>
