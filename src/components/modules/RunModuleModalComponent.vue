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

            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              @invalid-submit="onInvalidSubmit"
              :initial-values="formValues"
              method="POST"
              class="space-y-8 divide-y divide-gray-200"
            >
              <div class="space-y-8 divide-y divide-gray-200">
                <div class="pt-8">
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Run {{ moduleData.name }}
                    </h3>
                  </div>
                  <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div v-for="(option, key) in stringTypeOptions" class="sm:col-span-3">
                      <!--{{ option }}-->
                      <label
                        :for="option.name.toLowerCase()"
                        class="block text-sm font-medium"
                      >
                        {{ option.name }}
                      </label>

                      <div class="mt-1">
                        <Field
                          :type="setOptionFieldType(option.type)"
                          :name="option.name.toLowerCase()"
                          :id="option.name.toLowerCase()"
                          :value="option.default"
                          v-on:keypress="isLetter($event)"
                          autocomplete="given-name"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <p class="mt-2 text-sm text-gray-500" id="email-description">
                          {{ option.desc }}
                          <span v-if="option.required" class="font-semibold">
                            (Field required)</span
                          >
                        </p>
                      </div>

                      <div class="text-sm text-red-600">
                        <ErrorMessage name="name" />
                      </div>
                    </div>

                    <div
                      class="mt-1 sm:col-span-3"
                      v-for="(option, key, index) in boolTypeOptions"
                    >
                      <div
                        class="relative flex items-start"
                        v-show="option.type === 'bool'"
                      >
                        <div class="flex items-center h-5">
                          <Field
                            :id="option.name"
                            :aria-describedby="'checkbox' + option.name"
                            :name="option.name"
                            type="checkbox"
                            :value="true"
                            v-bind:unchecked-value="false"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="comments" class="font-medium text-gray-700">{{
                            option.name
                          }}</label>
                          <p id="comments-description" class="text-gray-500">
                            {{ option.desc }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--{{ enumTypeOptions }}-->
              <!-- start enum select -->
              <div class="flex flex-wrap mt-2">
                <div v-for="enumOption in enumTypeOptions" class="mt-4 p-2 w-1/2">
                  <label
                    :for="enumOption.name"
                    class="block text-sm font-medium text-gray-700"
                    >{{ enumOption.name }}</label
                  >
                  <Field
                    :id="enumOption.name"
                    :name="enumOption.name"
                    as="select"
                    class="mt-1 block pl-3 w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option
                      v-for="(option, index) in enumOption.enums"
                      :value="option"
                      :selected="index === 0"
                    >
                      {{ option }}
                    </option>
                  </Field>
                </div>
              </div>
              <!-- end enum select -->
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
                    Run module
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
import { ref, reactive, watch, inject, computed, onMounted } from "vue";
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import * as yup from "yup";
import ToastService from "../../services/ToastService";
import { Form, Field, ErrorMessage } from "vee-validate";

let open = ref(false);
let moduleData = reactive({});
let moduleOptions = reactive([]);

let selectedOpt = ref("none");

// Initial values
let formValues = ref({});

//let selected = ref(false);

const { bus, emit } = useEventsBus();

function toggleModal() {
  open.value = !open.value;
}

function setOptionFieldType(optionType) {
  if (optionType == "string") return "text";
  else if (optionType == "bool") return "checkbox";
  else return "text";
}

function processModuleOptions() {
  moduleOptions.splice(0);
  Object.keys(moduleData.options).forEach(function (key) {
    console.log(key, moduleData.options[key]);
    moduleData.options[key].name = key;
    formValues.value[key] = moduleData.options[key].default;

    moduleOptions.push(moduleData.options[key]);
  });
  console.log(formValues.value);
}

watch(
  () => bus.value.get("showRunModuleModal"),
  (val) => {
    // console.log(val[0].module_data);
    moduleData = val[0].module_data;
    //moduleOptions = val[0].module_data.options;
    // console.log(moduleOptions);

    processModuleOptions();
    console.log(moduleOptions);
    toggleModal();
    /*
    // Initial values
    formValues = {
      name: empData.value.name,
      surname: empData.value.surname,
      position: empData.value.position,
      salary: empData.value.salary,
    };
    */
  }
);

const $loading = inject("$loading");

const onSubmit = (options) => {
  const loader = $loading.show();
  console.log(options);
  /*
  newUserData.is_owner = 0;
  UserDataService.update(empData.value.id, newUserData)
    .then(() => {
      ToastService.showToast("User data was updated successfully");
      toggleModal();
      emit("refreshEmployeesTable");
      loader.hide();
    })
    .catch((error) => {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);

    });
    */
  ToastService.showToast("Module was run successfully");
  setTimeout(loader.hide(), 5000);
};

const schema = yup.object({
  /*
  name: yup
    .string()
    .required("Name is a required field")
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be at most 30 characters"),
  surname: yup
    .string()
    .required("Surname is a required field")
    .min(2, "Surname must be at least 2 characters")
    .max(30, "Surname must be at most 30 characters"),
  position: yup
    .string()
    .required("Position is a required field")
    .min(2, "Position must be at least 2 characters")
    .max(30, "Position must be at most 30 characters"),
  salary: yup
    .number()
    .required("Salary is a required field")
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .min(4, "Salary must be at least 4 digits"),
    */
});

function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}

function isLetter(e) {
  let char = String.fromCharCode(e.keyCode); // Get the character
  if (/^[A-Za-z ]+$/.test(char)) return true;
  // Match with regex
  else e.preventDefault(); // If not match, don't add to input text
}

function isDigit(e) {
  let char = String.fromCharCode(e.keyCode); // Get the character
  if (/^[0-9]+$/.test(char)) return true;
  // Match with regex
  else e.preventDefault(); // If not match, don't add to input text
}

const boolTypeOptions = computed(() => {
  return moduleOptions.filter((o) => {
    if (o.type === "bool") return o;
  });
});

const stringTypeOptions = computed(() => {
  return moduleOptions.filter((o) => {
    if (o.type != "bool" && o.type != "enum") return o;
  });
});

const optionsType = "enum";
const enumTypeOptions = computed(() => {
  return moduleOptions.filter((o) => {
    if (o.type === "enum") return o;
  });
});
</script>
