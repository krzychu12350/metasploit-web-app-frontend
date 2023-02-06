<template>
  <p class="text-black">
    {{ meterpreterData }}
  </p>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import SessionDataService from "../services/SessionDataService";

let meterpreterData = ref({});

onBeforeMount(() => {
  SessionDataService.meterpreterWrite({
    session_id: 1,
    ps: "ipconfig",
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  SessionDataService.meterpreterRead({
    session_id: 1,
  })
    .then((res) => {
      console.log(res.data);
      meterpreterData.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
