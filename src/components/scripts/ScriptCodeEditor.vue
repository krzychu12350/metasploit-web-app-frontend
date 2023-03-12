<template>
  <code-editor v-model="code" :dark="false" :tabsize="2" language="javascript" />
</template>

<script>
import { ref } from "vue";
import { codeEditor } from "@wcfdehao/code-editor";

export default {
  components: {
    codeEditor,
  },
  setup() {
    const code = ref(`console.log('Hello, world!')`);

    return {
      code,
    };
  },
};
</script>
