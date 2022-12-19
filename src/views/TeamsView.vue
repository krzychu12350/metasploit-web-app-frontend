<template>
    <NavbarComponent />
    <BreadcrumbComponent />
    <h1>Teams view</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarComponent from '../components/NavbarComponent.vue'
import BreadcrumbComponent from '../components/BreadcrumbComponent.vue'

export default defineComponent({
    name: "TeamsViews",
    components: {
        NavbarComponent,
        BreadcrumbComponent
    },
    setup() {
        return {

        }
    }
});
</script>

<style scoped>

</style>
