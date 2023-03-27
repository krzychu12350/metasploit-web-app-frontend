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
            class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6"
          >
            <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="open = false"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="flex-none flex-col sm:flex">
              <div class="flex-none p-6 text-center">
                <h2 class="mt-3 font-semibold text-gray-900">
                  {{ moduleData.name }}
                </h2>
                <p class="text-sm leading-6 text-gray-500">
                  {{ moduleData.description }}
                </p>
              </div>
              <div class="flex flex-auto flex-col justify-between p-6">
                <dl class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                  <dt class="col-end-1 font-semibold text-gray-900">Type</dt>
                  <dd>{{ moduleData.type }}</dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Full name</dt>
                  <dd class="truncate">
                    {{ moduleData.fullname }}
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">File path</dt>
                  <dd class="truncate">
                    {{ moduleData.filepath }}
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">License</dt>
                  <dd class="truncate">
                    {{ moduleData.license }}
                  </dd>

                  <dt class="col-end-1 font-semibold text-gray-900">Disclosure Date</dt>
                  <dd class="truncate">
                    {{ moduleData.disclosuredate }}
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Rank</dt>
                  <dd class="truncate">
                    {{ moduleData.rank }}
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Arch</dt>
                  <dd class="truncate">
                    <span v-for="arch in moduleData.arch"> {{ arch }} <br /> </span>
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Platform</dt>
                  <dd class="truncate">
                    <span v-for="platform in moduleData.platform">
                      {{ platform }} <br />
                    </span>
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Authors</dt>
                  <dd class="truncate">
                    <span v-for="author in moduleData.authors">
                      {{ author }} <br />
                    </span>
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Default target</dt>
                  <dd class="truncate">
                    <span> {{ moduleData.default_target }} </span>
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Stance</dt>
                  <dd class="truncate">
                    <span> {{ moduleData.stance }} </span>
                  </dd>
                  <dt class="col-end-1 font-semibold text-gray-900">Privileged</dt>
                  <dd class="truncate">
                    <span> {{ moduleData.privileged }} </span>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="pt-5">
              <div class="flex justify-end">
                <button
                  type="button"
                  class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="open = false"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  @click="showModuleRunningComponent(moduleData)"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Run module
                </button>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { ref, watch, reactive } from "vue";
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";

const { bus, emit } = useEventsBus();
let open = ref(false);
let moduleData = reactive({});

function toggleModal() {
  open.value = !open.value;
}

function showModuleRunningComponent(moduleData) {
  toggleModal();
  emit("showRunModuleModal", { module_data: moduleData });
}

watch(
  () => bus.value.get("showModuleDetailsModal"),
  (val) => {
    moduleData = val[0].module_data;
    toggleModal();
  }
);
</script>
