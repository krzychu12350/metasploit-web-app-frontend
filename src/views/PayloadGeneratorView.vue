<template>
    <NavbarComponent />
    <BreadcrumbComponent />
    <h1>Payload Generator View</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavbarComponent from '../components/NavbarComponent.vue'
import BreadcrumbComponent from '../components/BreadcrumbComponent.vue'

export default defineComponent({
    name: "PayloadGeneratorView",
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
