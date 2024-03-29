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
              :initial-values="initialUpdatingFormValues"
              @invalid-submit="onInvalidSubmit"
              method="POST"
              class="space-y-8 divide-y divide-gray-200"
            >
              <div class="space-y-8 divide-y divide-gray-200">
                <div class="pt-8">
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Editing the script
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">Fill in the script details</p>
                  </div>
                  <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-800">
                        Script name
                      </label>
                      <div class="mt-1">
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Script name"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                      <div class="text-sm text-red-600 mt-2">
                        <ErrorMessage name="name" />
                      </div>
                    </div>

                    <div>
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
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                      <div class="text-sm text-red-600 mt-2">
                        <ErrorMessage name="file_name" />
                      </div>
                    </div>
                    <div>
                      <label for="type" class="block text-sm font-medium text-gray-700"
                        >Type</label
                      >
                      <Field
                        id="type"
                        name="type"
                        as="select"
                        v-model="selected"
                        class="mt-1 block pl-3 w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="console">Console</option>
                        <option value="meterpreter">Meterpreter</option>
                      </Field>
                    </div>
                    <div>
                      <label for="type" class="block text-sm font-medium text-gray-700"
                        >Contents</label
                      >
                      <div class="mt-4">
                        <code-editor
                          v-model="scriptCode"
                          :dark="false"
                          :tabsize="2"
                          language="javascript"
                        />
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
                    Update
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
import ToastService from "../../services/ToastService";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ScriptsDataService from "../../services/ScriptsDataService";
import { codeEditor } from "@wcfdehao/code-editor";

let scriptCode = ref("");
let initialUpdatingFormValues = ref();
let currentScriptData = reactive({});
let open = ref(false);
const { bus, emit } = useEventsBus();
const showPassword = ref(false);
let selected = ref("");
function toggleModal() {
  open.value = !open.value;
}

watch(
  () => bus.value.get("showEditingScriptModal"),
  (data) => {
    toggleModal();
    currentScriptData = data[0].script_data;
    console.log(currentScriptData);
    initialUpdatingFormValues = {
      name: currentScriptData.name,
      file_name: currentScriptData.file_name,
    };
    selected.value = currentScriptData.type;
    scriptCode.value = currentScriptData.contents;
  }
);

async function updateScript(id, data) {
  ScriptsDataService.updateScript(id, data)
    .then((res) => {
      console.log(res.data.message);
      if (res.status === 200) {
        emit("refreshScriptsTable");
        ToastService.showToast(res.data.message);
        toggleModal();
      }
    })
    .catch((err) => {
      if (err) ToastService.showToast(err.response.data.message, "error");
    });
}

const onSubmit = async (updatedScriptDetails) => {
  updatedScriptDetails.contents = scriptCode.value;
  console.log(currentScriptData.id, updatedScriptDetails);
  await updateScript(currentScriptData.id, updatedScriptDetails);
};

const schema = yup.object({
  name: yup.string().required("Script name is a required field"),
  file_name: yup.string().required("File name is a required field"),
});

function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}
</script>
