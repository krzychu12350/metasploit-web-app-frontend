<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="open = false">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div>
              <div
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
              >
                <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  Properties
                </DialogTitle>

                <div class="flex flex-col mt-2">
                  <span v-if="filePropsData[2] == 'dir'">Type: File folder</span>
                  <span v-else>Type: File</span>
                  <span>Name: {{ filePropsData[4] }}</span>
                  <span>Size: {{ filePropsData[1] }}</span>
                  <span>Last modifed: {{ filePropsData[3].slice(0, 19) }}</span>
                  <span>Mode: {{ filePropsData[0] }}</span>

                  <!--
                  <p class="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
                    amet labore.
                  </p>
                  
                  {{ filePropsData }}
           
                --></div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-900 focus:outline-none sm:text-sm"
                @click="open = false"
              >
                Ok
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch, reactive, onMounted } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { CheckIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../../../composables/eventBus";

const { bus } = useEventsBus();

const open = ref(false);
let filePropsData = reactive([]);

function toggleModal() {
  open.value = !open.value;
}

onMounted(() => {
  console.log("Mounted");
});

watch(
  () => bus.value.get("showFileOrDirDetailsModal"),
  (val) => {
    toggleModal();
    //alert("testt");
    //console.log(val[0].host_id);
    filePropsData = val[0].clicked_file;
  }
);
</script>
