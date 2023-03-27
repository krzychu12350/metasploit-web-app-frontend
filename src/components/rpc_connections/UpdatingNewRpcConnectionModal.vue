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
              :initial-values="initialUpdatingFormValues"
              method="POST"
              class="space-y-8 divide-y divide-gray-200"
            >
              <div class="space-y-8 divide-y divide-gray-200">
                <div class="pt-8">
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Update existing RPC connection
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      Fill in the RPC connection settings
                    </p>
                  </div>
                  <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-1">
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-800">
                        User name
                      </label>

                      <div class="mt-1">
                        <Field
                          id="user_name"
                          name="user_name"
                          type="text"
                          :value="currentConnectionSettings.user_name"
                          placeholder="User name"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                      <div class="text-sm text-red-600 mt-2">
                        <ErrorMessage name="user_name" />
                      </div>
                    </div>

                    <div class="space-y-1">
                      <label
                        for="user_password"
                        class="block text-sm font-medium text-gray-800"
                      >
                        Password
                      </label>
                      <div class="relative mt-1">
                        <Field
                          id="user_password"
                          name="user_password"
                          placeholder="Password"
                          autocomplete="user_password"
                          :type="[showPassword ? 'text' : 'password']"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                        <div
                          class="absolute inset-y-0 right-0 flex items-center mr-3 cursor-pointer"
                        >
                          <EyeIcon
                            v-if="showPassword === true"
                            class="h-5 w-5 text-gray-400 hover:text-gray-800"
                            aria-hidden="true"
                            @click="togglePasswordVisibity"
                          />
                          <EyeSlashIcon
                            v-else
                            @click="togglePasswordVisibity"
                            class="h-5 w-5 text-gray-400 hover:text-gray-800"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <div class="text-sm text-red-600 mt-2">
                        <ErrorMessage name="user_password" />
                      </div>
                    </div>

                    <div class="space-y-1">
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-800"
                      >
                        IP Address
                      </label>
                      <div class="mt-1">
                        <Field
                          id="ip"
                          name="ip"
                          type="text"
                          placeholder="IP Address"
                          autocomplete="ip"
                          v-on:keypress="isDigitOrDot($event)"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                        <div class="text-sm text-red-600 mt-2">
                          <ErrorMessage name="ip" />
                        </div>
                      </div>
                    </div>

                    <div class="space-y-1">
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-800"
                      >
                        Port
                      </label>
                      <div class="mt-1">
                        <Field
                          id="port"
                          name="port"
                          type="text"
                          placeholder="Port"
                          autocomplete="port"
                          v-on:keypress="isDigit($event)"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                      <div class="text-sm text-red-600 mt-2">
                        <ErrorMessage name="port" />
                      </div>
                    </div>
                    <div class="space-y-1">
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-800"
                      >
                        Web Server URI
                      </label>
                      <div class="mt-1">
                        <Field
                          id="web_server_uri"
                          name="web_server_uri"
                          type="text"
                          placeholder="Web Server URI"
                          autocomplete="web_server_uri"
                          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        />
                      </div>
                      <div class="text-sm text-red-600 mt-2">
                        <ErrorMessage name="web_server_uri" />
                      </div>
                    </div>
                    <SwitchGroup as="div" class="flex items-center">
                      <Switch
                        v-model="isHttpEnabled"
                        :class="[
                          isHttpEnabled ? 'bg-gray-800' : 'bg-gray-200',
                          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
                        ]"
                      >
                        <span
                          aria-hidden="true"
                          :class="[
                            isHttpEnabled ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                          ]"
                        />
                      </Switch>
                      <SwitchLabel as="span" class="ml-3">
                        <span class="text-sm font-medium text-gray-900">Over HTTPS </span>
                      </SwitchLabel>
                    </SwitchGroup>
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
import { ref, watch, onMounted, onBeforeUnmount, reactive } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import ToastService from "../../services/ToastService";
import { Form, Field, ErrorMessage } from "vee-validate";
import MsfRpcServerConnectionService from "../../services/MsfRpcServerConnectionService";
import * as yup from "yup";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";

let open = ref(false);
const isHttpEnabled = ref(false);
const { bus, emit } = useEventsBus();
let connections = reactive([]);
const showPassword = ref(false);
let currentConnectionSettings = reactive({});
let initialUpdatingFormValues = ref();

function toggleModal() {
  open.value = !open.value;
}

const togglePasswordVisibity = () => {
  showPassword.value = !showPassword.value;
};

watch(
  () => bus.value.get("showRpcConnectionEditingModal"),
  (data) => {
    connections = data[0].all_connections;
    currentConnectionSettings = data[0].connection_data;
    initialUpdatingFormValues = {
      id: currentConnectionSettings.id,
      user_name: currentConnectionSettings.user_name,
      user_password: currentConnectionSettings.user_password,
      ip: currentConnectionSettings.ip,
      port: currentConnectionSettings.port,
      web_server_uri: currentConnectionSettings.web_server_uri,
    };
    isHttpEnabled.value = currentConnectionSettings.ssl;
    toggleModal();
  }
);

async function updateRpcConnection(connectionSettings) {
  MsfRpcServerConnectionService.updateExistingConnection(
    currentConnectionSettings.id,
    connectionSettings
  )
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        emit("refreshRpcConnectionsTable");
        ToastService.showToast("The RPC connection settings was updated successfully");
        toggleModal();
      }
    })
    .catch((err) => console.log(err));
}

async function checkIfConnectionAlreadyExist(connectionSettings) {
  return connections.some((connection) => {
    if (
      connection.user_name === connectionSettings.user_name &&
      connection.user_password === connectionSettings.user_password &&
      connection.ip === connectionSettings.ip &&
      connection.port === connectionSettings.port &&
      connection.web_server_uri === connectionSettings.web_server_uri &&
      connection.ssl === connectionSettings.ssl
    )
      return true;
    else return false;
  });
}

const onSubmit = async (newConnectionSettings) => {
  newConnectionSettings.ssl = isHttpEnabled.value;
  console.log(newConnectionSettings);
  const isConnectionAlreadyExsits = await checkIfConnectionAlreadyExist(
    newConnectionSettings
  );
  console.log(isConnectionAlreadyExsits);
  if (isConnectionAlreadyExsits) {
    ToastService.showToast(
      "There is already a RPC connection with such settings",
      "error"
    );
    toggleModal();
  } else updateRpcConnection(newConnectionSettings);
};

const schema = yup.object({
  user_name: yup
    .string()
    .required("Username is a required field")
    .min(3, "Username must be at least 3 characters"),
  user_password: yup
    .string()
    .required("Password is a required field")
    .min(3, "Password must be at least 3 characters"),
  ip: yup
    .string()
    .required("IP Address is a required field")
    .matches(
      /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
      "Enter proper IP Address"
    ),
  port: yup
    .number()
    .required("Port is a required field")
    .transform((value) =>
      isNaN(value) || value === null || value === undefined ? 0 : value
    )
    .min(0, "Port must be at least 0")
    .max(65536, "Port can be maximum 65536"),
  web_server_uri: yup
    .string()
    .matches(/[a-zA-Z0-9]$/, "Enter correct Web Server URI")
    .required("Web Server URI is a required field"),
});

function onInvalidSubmit({ values, errors, results }) {
  console.log(values); // current form values
  console.log(errors); // a map of field names and their first error message
  console.log(results); // a detailed map of field names and their validation results
}

function isDigit(e) {
  let char = String.fromCharCode(e.keyCode); // Get the character
  if (/^[0-9]+$/.test(char)) return true;
  // Match with regex
  else e.preventDefault(); // If not match, don't add to input text
}

function isDigitOrDot(e) {
  let char = String.fromCharCode(e.keyCode); // Get the character
  if (/^[0-9\.:]+$/.test(char)) return true;
  // Match with regex
  else e.preventDefault(); // If not match, don't add to input text
}
</script>
