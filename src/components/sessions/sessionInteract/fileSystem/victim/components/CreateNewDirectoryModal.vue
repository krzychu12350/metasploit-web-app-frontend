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
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              @invalid-submit="onInvalidSubmit"
              method="POST"
              class="space-y-6"
            >
              <div>
                <div
                  class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
                >
                  <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div class="mt-3 sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-lg text-center leading-6 font-medium text-gray-900"
                  >
                    Create new directory
                  </DialogTitle>

                  <div class="mt-2">
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-800 mb-2 mt-2"
                      >
                        Directory name
                      </label>
                      <div class="mt-1">
                        <Field
                          id="directory_name"
                          name="directory_name"
                          type="text"
                          placeholder="User name"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                      <div class="text-sm text-red-600 mt-2">
                        <ErrorMessage name="directory_name" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  type="submit"
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:text-sm"
                >
                  Create
                </button>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { CheckIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../../../../../composables/eventBus";

const { bus, emit } = useEventsBus();

const open = ref(false);
let fileContent = reactive([]);

function toggleModal() {
  open.value = !open.value;
}

const schema = yup.object({
  directory_name: yup
    .string()
    .required("Directory name is a required field")
    .min(2, "Directory name must be at least 2 characters"),
});

const onSubmit = (directory) => {
  console.log(directory.directory_name);
  emit("createNewDirectory", { directory_name: directory.directory_name });
  toggleModal();
};

function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}

watch(
  () => bus.value.get("showCreateNewDirectoryModal"),
  () => {
    toggleModal();
  }
);
</script>
