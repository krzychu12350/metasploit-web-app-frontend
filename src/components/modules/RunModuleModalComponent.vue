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
              class="space-y-2"
            >
              <div class="space-y-2">
                <div class="pt-8">
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Set {{ moduleData.name }} Options
                    </h3>
                  </div>
                  <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div
                      v-for="(option, key) in stringTypeBasicOptions"
                      class="sm:col-span-3"
                    >
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
                          :name="option.name"
                          :id="option.name.toLowerCase()"
                          :value="option.default"
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
                        <ErrorMessage :name="option.name" />
                      </div>
                    </div>

                    <div
                      class="mt-1 sm:col-span-3"
                      v-for="(option, key, index) in boolTypeBasicOptions"
                    >
                      <div
                        class="relative flex items-start"
                        v-show="option.type === 'bool' && option.advanced === false"
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

              <!--{{ enumTypeBasicOptions }}-->
              <!-- start enum select -->
              <div class="flex flex-wrap mt-2">
                <div v-for="enumOption in enumTypeBasicOptions" class="mt-4 p-2 w-1/2">
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
              <div class="mt-1 sm:col-span-3">
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="advanced-options"
                      aria-describedby="advanced-options"
                      name="advanced-options"
                      type="checkbox"
                      true-value="1"
                      false-value="0"
                      :checked="false"
                      @click="showAdvancedOptions = !showAdvancedOptions"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 mb-2 text-sm">
                    <label for="advanced-options" class="font-medium text-gray-700"
                      >Show advanced options</label
                    >
                  </div>
                </div>
              </div>
              <!--ADVANCED OPTIONS START -->
              <div v-if="showAdvancedOptions">
                <div class="space-y-2">
                  <div class="pt-2">
                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div
                        v-for="(option, key) in stringTypeAdvancedOptions"
                        class="sm:col-span-3"
                      >
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
                            :name="option.name"
                            :id="option.name.toLowerCase()"
                            :value="option.default"
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
                          <ErrorMessage :name="option.name" />
                        </div>
                      </div>

                      <div
                        class="mt-1 sm:col-span-3"
                        v-for="(option, key, index) in boolTypeAdvancedOptions"
                      >
                        <div class="relative flex items-start">
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
                <!-- start enum select -->
                <div class="flex flex-wrap mt-2">
                  <div
                    v-for="enumOption in enumTypeAdvancedOptions"
                    class="mt-4 p-2 w-1/2"
                  >
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
              </div>

              <!--ADVANCED OPTIONS END -->

              <!--PAYLOAD SETTINGS-->

              <label
                v-if="moduleData.type == 'exploit'"
                class="block text-sm font-medium text-gray-700"
              >
                Choose payload {{ moduleData.type }}</label
              >
              <div class="mt-0" v-if="moduleData.type == 'exploit'">
                <Multiselect
                  class="m-0"
                  v-model="selectedPayload"
                  :options="payloads"
                  :searchable="true"
                  placeholder="Choose a payload"
                />
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
                    v-if="moduleData.type == 'exploit'"
                    type="submit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Configure payload options
                  </button>
                  <button
                    v-else
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
import { ref, reactive, watch, inject, computed, onMounted, onBeforeMount } from "vue";
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import * as Yup from "yup";
import ToastService from "../../services/ToastService";
import { Form, Field, ErrorMessage } from "vee-validate";
import ConsoleDataService from "../../services/ConsoleDataService";
import Multiselect from "@vueform/multiselect";
import { useMsfModules } from "../../stores/useMsfModules";

const useMetasploitModules = useMsfModules();
const selectedPayload = ref("");
const showAdvancedOptions = ref(false);

const options = ref(["Batman", "Robin", "Joker"]);
let payloads = ref([]);

function nameWithLang({ name, language }) {
  return `${name} — [${language}]`;
}

let open = ref(false);
let moduleData = reactive({});
let basicModuleOptions = reactive([]);
let advancedModuleOptions = reactive([]);

const schema = ref();

let selectedOpt = ref("none");

// Initial values
let formValues = ref({});

//let selected = ref(false);
const $loading = inject("$loading");
const { bus, emit } = useEventsBus();

onMounted(async () => {});

function toggleModal() {
  open.value = !open.value;
}

function setOptionFieldType(optionType) {
  if (optionType == "string") return "text";
  else if (optionType == "bool") return "checkbox";
  else return "text";
}

function processModuleOptions() {
  const fields = [];
  basicModuleOptions.splice(0);
  advancedModuleOptions.splice(0);
  Object.keys(moduleData.options).forEach(function (key) {
    moduleData.options[key].name = key;
    console.log(key, moduleData.options[key]);
    if (moduleData.options[key].advanced === false) {
      formValues.value[key] = moduleData.options[key].default;

      if (moduleData.options[key].type === "string") {
        let newField = new Object();
        newField.name = moduleData.options[key].name;

        if ((moduleData.options[key].required = "true"))
          newField.validations = ["string", "required"];
        else newField.validations = ["string"];

        //newField.validations = ["string", "required"];
        newField.params = {
          required: moduleData.options[key].name + " is required",
        };
        fields.push(newField);
      }

      basicModuleOptions.push(moduleData.options[key]);
    } else {
      advancedModuleOptions.push(moduleData.options[key]);
    }
  });
  console.log(basicModuleOptions);
  console.log(advancedModuleOptions);
  //console.log(formValues.value);
  console.log(fields);
  /*
  const fields2 = [
    {
      name: "username",
      type: "text",
      label: "Username",
      placeholder: "Username",
      validations: ["string", "strict", "trim", "min", "max", "required"],
      params: {
        min: 3,
        max: 20,
        required: "Username is required",
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      validations: ["string", "email", "trim", "required"],
      params: {
        required: "Email is required",
      },
    },
    {
      name: "isBig",
      type: "checkbox",
      label: "Is Big",
      validations: ["boolean"],
      params: {},
    },
    {
      name: "count",
      type: "number",
      label: "Count",
      validations: ["number", "when"],
      params: {
        when: [
          "isBig",
          {
            is: true,
            then: {
              min: 5,
            },
            otherwise: {
              min: 0,
            },
          },
        ],
      },
    },
  ];
    */
  schema.value = createValidationSchema(fields);
  console.log(schema.value);
}

async function extractPayloadsNamesToArray(payloads) {
  return payloads.map((p) => p.module_name);
}

watch(
  () => bus.value.get("showRunModuleModal"),
  async (val) => {
    // console.log(val[0].module_data);
    moduleData = val[0].module_data;
    //moduleOptions = val[0].module_data.options;
    // console.log(moduleOptions);

    processModuleOptions();
    //console.log(moduleOptions);
    toggleModal();
    payloads.value = await useMetasploitModules.getMsfPayloads;
    payloads.value = await extractPayloadsNamesToArray(payloads.value);
    console.log(payloads.value);
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

watch(
  () => bus.value.get("completeModuleRunningProcess"),
  (val) => {
    //loader.hide();
    const moduleName = val[0].module_name;
    ToastService.showToast("Module " + moduleName + " was run successfully");
  }
);
watch(
  () => bus.value.get("closeModuleConfigurationModal"),
  () => {
    toggleModal();
  }
);

const onSubmit = (options) => {
  options.PAYLOAD = selectedPayload.value;
  console.log(options);
  console.log(moduleData);

  console.log(options);
  if (moduleData.type == "exploit") {
    showPayloadConfigurationModal(moduleData, options);
  } else {
    //$loading.show();

    runModule(moduleData, options);
    toggleModal();
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
  }
};

/*
const schema = Yup.object({
  WORKSPACE: Yup.string().required("WORKSPACE is a required field"),

});
*/
function showPayloadConfigurationModal(moduleData, moduleSetOptions) {
  console.log(moduleData, moduleSetOptions);
  emit("showPayloadConfigurationModal", {
    module_data: moduleData,
    module_options: moduleSetOptions,
  });
  // alert("showAnotherModal");
}

async function createConsole() {
  return ConsoleDataService.create()
    .then((res) => {
      console.log(res.data);
      return res.data.data;
    })
    .catch((err) => console.log(err));
}

function writeDataToConsole(data) {
  ConsoleDataService.write(data).then((res) => {
    console.log(res.data.data);
    //const test = "dddd";
    //this.send_to_terminal = `<p>` + res.data.data + `</p>`;
  });
}

async function runModule(module, moduleOptions) {
  //console.log(module, moduleOptions);
  emit("runModule", { module_details: module, module_options: moduleOptions });
  //emit("runNmapScan");
}

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

const boolTypeBasicOptions = computed(() => {
  return basicModuleOptions.filter((o) => {
    if (o.type === "bool") return o;
  });
});

const stringTypeBasicOptions = computed(() => {
  return basicModuleOptions.filter((o) => {
    if (o.type != "bool" && o.type != "enum") return o;
  });
});

const enumTypeBasicOptions = computed(() => {
  return basicModuleOptions.filter((o) => {
    if (o.type === "enum") return o;
  });
});

const boolTypeAdvancedOptions = computed(() => {
  return advancedModuleOptions.filter((o) => {
    if (o.type === "bool") return o;
  });
});

const stringTypeAdvancedOptions = computed(() => {
  return advancedModuleOptions.filter((o) => {
    if (o.type != "bool" && o.type != "enum") return o;
  });
});

const enumTypeAdvancedOptions = computed(() => {
  return advancedModuleOptions.filter((o) => {
    if (o.type === "enum") return o;
  });
});

/*
const basicOptions = computed(() => {
  return basicModuleOptions.filter((o) => {
    if (o.advanced === true) return o;
  });
});

const advancedOptions = computed(() => {
  return basicModuleOptions.filter((o) => {
    if (o.advanced === true) return o;
  });
});
*/

function createValidationSchema(fields = []) {
  const ObjectSchema = fields.reduce((schema, field) => {
    if (field?.validations?.length) {
      schema[field.name] = field.validations.reduce(
        (yup, type) => {
          if (field.params[type]) {
            const params = Array.isArray(field.params[type])
              ? field.params[type]
              : [field.params[type]];

            yup = yup[type](...params);
          } else {
            yup = yup[type]();
          }

          return yup;
        },
        { ...Yup }
      );
    }

    return schema;
  }, {});

  return Yup.object().shape({ ...ObjectSchema });
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
