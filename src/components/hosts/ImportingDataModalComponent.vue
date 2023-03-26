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
                      Importing Data into a Workspace
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">Fill in host IP Address</p>
                  </div>
                  <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
                    <div class="space-y-1">
                      <label
                        for="file_dir"
                        class="block text-sm font-medium text-gray-800"
                      >
                        Exporting directory
                      </label>
                      <div class="mt-1">
                        <Field
                          id="file_dir"
                          name="file_dir"
                          type="text"
                          placeholder="File absolute path"
                          autocomplete="file_dir"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                        <div class="text-sm text-red-600 mt-2">
                          <ErrorMessage name="file_dir" />
                        </div>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <label
                        for="file_name"
                        class="block text-sm font-medium text-gray-800"
                      >
                        File name
                      </label>
                      <div class="mt-1">
                        <Field
                          id="file_name"
                          name="file_name"
                          type="text"
                          placeholder="File name"
                          autocomplete="file_name"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                        <div class="text-sm text-red-600 mt-2">
                          <ErrorMessage name="file_name" />
                        </div>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <label
                        for="file_type"
                        class="block text-sm font-medium text-gray-700"
                        >File type</label
                      >
                      <Field
                        id="file_type"
                        name="file_type"
                        as="select"
                        v-model="selected"
                        class="mt-1 block pl-3 w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="xml" selected="selected">XML</option>
                        <option value="pwdump">PWDUMP</option>
                      </Field>
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
                    Import data
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
import ModuleDataService from "../../services/ModuleDataService";

let open = ref(false);
const { bus, emit } = useEventsBus();

function toggleModal() {
  open.value = !open.value;
}

const selected = ref("xml");

watch(
  () => bus.value.get("showImportingDataModal"),
  () => {
    toggleModal();
  }
);

const onSubmit = async (importingSettings) => {
  console.log(importingSettings);
  emit("importDataIntoWorkspace", { importing_settings: importingSettings });
  toggleModal();
  //db_export -f xml -a /path/to/export-name.xml
  // toggleModal();
};

const schema = yup.object({
  file_dir: yup
    .string()
    .required("Exporting directory is a required field")
    .matches(
      /(\/.*|[a-zA-Z]:\\(?:([^<>:"\/\\|?*]*[^<>:"\/\\|?*.]\\|..\\)*([^<>:"\/\\|?*]*[^<>:"\/\\|?*.]\\?|..\\))?)/,
      "Type in properly file absolute path"
    ),
  file_name: yup.string().required("File name is a required field"),
});

function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}
</script>
