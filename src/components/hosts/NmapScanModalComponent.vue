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

            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              @invalid-submit="onInvalidSubmit"
              method="POST"
              class="space-y-8 divide-y divide-gray-200"
            >
              <div class="space-y-8 divide-y divide-gray-200">
                <div class="pt-8">
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      <span v-if="scanType === 'quick'">Nmap quick scan</span>
                      <span v-if="scanType === 'aggressive'">Nmap aggressive scan</span>
                      <span v-if="scanType === 'os detection'"
                        >Nmap os detection scan</span
                      >
                      <span v-if="scanType === 'custom'">Nmap custom scan</span>
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">Fill in IP address range</p>
                  </div>
                  <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
                    <div class="space-y-1">
                      <label
                        for="nmap_command"
                        class="block text-sm font-medium text-gray-800"
                        v-if="scanType === 'custom'"
                      >
                        Nmap command
                      </label>
                      <label
                        v-else
                        for="ip_range"
                        class="block text-sm font-medium text-gray-800"
                      >
                        IP address range
                      </label>
                      <div class="mt-1">
                        <Field
                          v-if="scanType === 'custom'"
                          id="ip_range"
                          name="ip_range"
                          type="text"
                          placeholder="eg. nmap -sP 192.168.2.1/24"
                          autocomplete="ip_range"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                        <Field
                          v-else
                          id="ip_range"
                          name="ip_range"
                          type="text"
                          placeholder="eg. 192.168.1.0/24 or 192.168.1.0"
                          autocomplete="ip_range"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                        <div class="text-sm text-red-600 mt-2">
                          <ErrorMessage name="ip_range" />
                        </div>
                      </div>
                    </div>
                  </div>
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
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Scan hosts
                  </button>
                </div>
              </div>
            </Form>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ToastPlugin from "vue-toast-notification";
import ToastService from "../../services/ToastService";

let open = ref(false);
const { bus, emit } = useEventsBus();
let scanType = ref("");
let fieldName = ref("");

function toggleModal() {
  open.value = !open.value;
}

watch(
  () => bus.value.get("showNmapScanSettingsModal"),
  (data) => {
    scanType.value = data[0].scan_type;
    toggleModal();
  }
);

const onSubmit = async (nmapScanningSettings) => {
  console.log(nmapScanningSettings);
  if (scanType.value === "quick")
    emit("runNmapScan", {
      nmap_command: "db_nmap -sn " + nmapScanningSettings.ip_range,
    });
  else if (scanType.value === "aggressive")
    emit("runNmapScan", {
      nmap_command: "db_nmap -sV -A " + nmapScanningSettings.ip_range,
    });
  else if (scanType.value === "os detection")
    emit("runNmapScan", {
      nmap_command: "db_nmap -O " + nmapScanningSettings.ip_range,
    });
  else if (scanType.value === "custom")
    emit("runNmapScan", {
      nmap_command: "db_" + nmapScanningSettings.ip_range,
    });
  else ToastService.showToast("Something went wrong...", "error");
  //
  toggleModal();
};

const schema = yup.object({
  ip_range: yup.string().required("This field is a required field"),
  /*
    .matches(
      /(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])|((\b|\.)(0|1|2(?!5(?=6|7|8|9)|6|7|8|9))?\d{1,2}){4}(-((\b|\.)(0|1|2(?!5(?=6|7|8|9)|6|7|8|9))?\d{1,2}){4}|\/((0|1|2|3(?=1|2))\d|\d))\b/,
      "Enter proper IP address or IP addresses range"
    ),
    */
});

function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}
</script>
