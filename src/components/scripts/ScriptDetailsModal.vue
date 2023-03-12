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
                class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="open = false"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div class="space-y-8 divide-y divide-gray-200">
              <div class="pt-8">
                <div>
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    The {{ currentScriptData.name }} script details
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">Check the script details</p>
                </div>
                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
                  <dl class="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                    <dt class="col-end-1 font-semibold text-gray-900">Name</dt>
                    <dd>{{ currentScriptData.name }}</dd>
                    <dt class="col-end-1 font-semibold text-gray-900">File name</dt>
                    <dd class="truncate">
                      {{ currentScriptData.file_name }}
                    </dd>
                    <dt class="col-end-1 font-semibold text-gray-900">
                      File absolute path
                    </dt>
                    <dd class="truncate">
                      {{ currentScriptData.file_abs_path }}
                    </dd>
                    <dt class="col-end-1 font-semibold text-gray-900">Created at</dt>
                    <dd class="truncate">
                      {{ moment(currentScriptData.created_at).format("LLL") }}
                    </dd>

                    <dt class="col-end-1 font-semibold text-gray-900">Last updated</dt>
                    <dd class="truncate">
                      {{ moment(currentScriptData.updated_at).format("LLL") }}
                    </dd>
                    <dt class="col-end-1 font-semibold text-gray-900">Contents</dt>
                    <dd class="truncate">
                      <div class="mt-4">
                        <code-editor
                          v-model="scriptCode"
                          :dark="false"
                          :tabsize="2"
                          :readOnly="true"
                          language="javascript"
                        />
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div class="pt-5">
              <div class="flex justify-end">
                <!--
                  <button
                    type="button"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="open = false"
                  >
                    Cancel
                  </button>
                  -->
                <button
                  @click="toggleModal()"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  OK
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
import { codeEditor } from "@wcfdehao/code-editor";
import moment from "moment";
let scriptCode = ref("");
let currentScriptData = reactive({});
let open = ref(false);

const { bus } = useEventsBus();

function toggleModal() {
  open.value = !open.value;
}

watch(
  () => bus.value.get("showScriptDetailsModal"),
  (data) => {
    toggleModal();
    currentScriptData = data[0].script_data;
    scriptCode.value = currentScriptData.contents;
    console.log(currentScriptData);
  }
);
</script>
