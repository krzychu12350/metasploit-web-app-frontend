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
            class="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity"
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
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          >
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                class="bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="open = false"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </button>
            </div>

            <div>
              <div
                class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
              >
                <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  Host services
                </DialogTitle>
                <div class="mt-2">
                  <div class="mt-8 flex flex-col">
                    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div
                        class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                      >
                        <p
                          v-if="hostServices.length == 0"
                          class="mt-2 text-sm text-gray-700 mb-4 text-red-600 font-semibold"
                        >
                          No services found for this host
                        </p>
                        <div
                          class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                          v-if="hostServices.length > 0"
                        >
                          <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 text-center"
                                >
                                  ID
                                </th>
                                <th
                                  scope="col"
                                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center"
                                >
                                  Name
                                </th>
                                <th
                                  scope="col"
                                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center"
                                >
                                  Port
                                </th>
                                <th
                                  scope="col"
                                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center"
                                >
                                  State
                                </th>
                                <th
                                  scope="col"
                                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center"
                                >
                                  Proto
                                </th>
                              </tr>
                            </thead>
                            <tbody class="bg-white">
                              <tr
                                v-for="(script, scriptIdx) in result"
                                :key="script"
                                :class="scriptIdx % 2 === 0 ? undefined : 'bg-gray-50'"
                              >
                                <td
                                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                                >
                                  {{ script.id }}
                                </td>
                                <td
                                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                  {{ script.name }}
                                </td>
                                <td
                                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                  {{ script.port }}
                                </td>
                                <td
                                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                  {{ script.state }}
                                </td>
                                <td
                                  class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                >
                                  {{ script.proto }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <nav
                            class="bg-white px-4 py-3 flex items-center justify-between sm:px-6"
                            aria-label="Pagination"
                          >
                            <div class="hidden sm:block">
                              <p class="text-sm text-gray-700">
                                Page
                                {{ " " }}
                                <span class="font-medium">{{ currentPage }}</span>
                                {{ " " }}
                                of
                                {{ " " }}
                                <span class="font-medium">{{ lastPage }}</span>
                              </p>
                            </div>
                            <div class="flex-1 flex justify-between sm:justify-end">
                              <button
                                @click="prev"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              >
                                Previous
                              </button>
                              <button
                                @click="next()"
                                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              >
                                Next
                              </button>
                            </div>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5 sm:mt-6">
              <button
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
import { XMarkIcon, CheckIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import DatabaseDataService from "../../services/DatabaseDataService";
import { useArrayPagination } from "vue-composable";

const { bus } = useEventsBus();

const open = ref(false);
const hostServices = ref([]);

const { result, next, prev, currentPage, lastPage } = useArrayPagination(hostServices, {
  pageSize: 5,
});

function toggleModal() {
  open.value = !open.value;
}

function getHostServices(hostId) {
  DatabaseDataService.getHostServices(hostId)
    .then((res) => {
      hostServices.value = res.data.services;
    })
    .catch((err) => {
      console.log(err);
    });
}

watch(
  () => bus.value.get("showHostServicesModal"),
  (val) => {
    toggleModal();
    getHostServices(val[0].host.id);
    prev();
  }
);
</script>
