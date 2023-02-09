<template>
  <button
    class="cursor-pointer ml-2 mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
  >
    {{ props.name }}
  </button>
</template>
<script setup>
const props = defineProps(["name"]);
</script>
