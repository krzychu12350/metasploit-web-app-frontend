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
                  Host details
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    IP Address: {{ hostDetails.address }}
                  </p>
                  <p class="text-sm text-gray-500">MAC Address: {{ hostDetails.mac }}</p>
                  <p class="text-sm text-gray-500">
                    Created at: {{ hostDetails.created_at }}
                  </p>
                  <p class="text-sm text-gray-500">OS: {{ hostDetails.os_name }}</p>
                  <p class="text-sm text-gray-500">OS Arch: {{ hostDetails.arch }}</p>
                  <p class="text-sm text-gray-500">Purpose: {{ hostDetails.purpose }}</p>
                  <p class="text-sm text-gray-500">
                    Service count: {{ hostDetails.service_count }}
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-900 focus:outline-none sm:text-sm"
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
import { ref, watch } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { CheckIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import DatabaseDataService from "../../services/DatabaseDataService";

const { bus } = useEventsBus();

const open = ref(false);
const hostDetails = ref({});

function toggleModal() {
  open.value = !open.value;
}

function getHostDetails(hostId) {
  DatabaseDataService.getHostDetails(hostId)
    .then((res) => {
      hostDetails.value = res.data.host_details;
    })
    .catch((err) => {
      console.log(err);
    });
}

watch(
  () => bus.value.get("showHostDetailsModal"),
  (val) => {
    toggleModal();
    getHostDetails(val[0].host.id);
  }
);
</script>
