<template>
    <NavbarComponent />
    <BreadcrumbComponent />
    <h1>Jobs view</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarComponent from '../components/NavbarComponent.vue'
import BreadcrumbComponent from '../components/BreadcrumbComponent.vue'

export default defineComponent({
    name: "JobsView",
    components: {
        NavbarComponent,
        BreadcrumbComponent,
    },
    setup() {
        return {

        }
    }
});
</script>

<style scoped>

</style>
