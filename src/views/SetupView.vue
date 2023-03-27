<template>
  <div class="min-h-full flex">
    <div
      class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-12 mx-auto" src="/logo.svg" alt="Workflow" />
          <h2 class="text-center mt-6 text-3xl font-extrabold text-gray-800">
            To start connect with Metasploit RPC
          </h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              @invalid-submit="onInvalidSubmit"
              method="POST"
              class="space-y-6"
            >
              <div>
                <label for="email" class="block text-sm font-medium text-gray-800">
                  User name
                </label>
                <div class="mt-1">
                  <Field
                    id="user_name"
                    name="user_name"
                    type="text"
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
                <label for="password" class="block text-sm font-medium text-gray-800">
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
                <label for="password" class="block text-sm font-medium text-gray-800">
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
                <label for="password" class="block text-sm font-medium text-gray-800">
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
              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1 brightness-75">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="../assets/msf_wallpaper2.jpg"
        alt=""
      />
    </div>
  </div>
</template>
<script setup>
import { ref, inject, defineProps, toRef, computed } from "vue";
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/vue/20/solid";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { useMsfAuth } from "../stores/useMsfAuth";
import ToastService from "../services/ToastService";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import { onUnmounted } from "vue";
import { useMsfModules } from "../stores/useMsfModules";
import { useCurrentMsfRpcConnection } from "../stores/useCurrentMsfRpcConnection";
import * as yup from "yup";
import ConsoleDataService from "../services/ConsoleDataService";
import { useMsfConsoles } from "../stores/useMsfConsoles";
import useEventsBus from "../composables/eventBus";

const isHttpEnabled = ref(false);
const router = useRouter();

const $loading = inject("$loading");
const showPassword = ref(false);
const { emit } = useEventsBus();
const useMetasploitModules = useMsfModules();
const useCurrentMetasploitRpcConnection = useCurrentMsfRpcConnection();
const useConsoles = useMsfConsoles();

const currentRpcConnectionId = ref(
  useCurrentMetasploitRpcConnection.getCurrentRpcConnection.id
);

const togglePasswordVisibity = () => {
  showPassword.value = !showPassword.value;
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

const onSubmit = (credentials) => {
  credentials.ssl = isHttpEnabled.value;
  console.log(credentials);
  connectWithMsf(credentials);
};

function onInvalidSubmit({ values, errors, results }) {
  console.log(values);
  console.log(errors);
  console.log(results);
}

async function createFirstConsole() {
  return ConsoleDataService.create()
    .then((res) => {
      console.log(res.data.data.id);
      return res.data.data.id;
    })
    .catch((err) => {
      console.log(err);
    });
}
onUnmounted(async () => {
  let firstConsoleId = await createFirstConsole();
  await useConsoles.storeConsoleData(
    parseInt(firstConsoleId),
    "",
    currentRpcConnectionId.value
  );
});

const isTooManyAttempts = computed(() => {
  return submitCount.value >= 1;
});

async function connectWithMsf(credentials) {
  const loader = $loading.show();
  await setMsfConnection(credentials, loader);
}

async function setMsfConnection(credentials, loader) {
  useMsfAuth()
    .setConnection(credentials)
    .then((connectionSettings) => {
      console.log(connectionSettings);
      useCurrentMetasploitRpcConnection.setCurrentRpcConnection(connectionSettings);
      useMsfConsoles.createCurrentConnectionConsolesDataArray;
      loginToMsfRpc(credentials, loader);
      emit("fetchCurrentWorkspace");
    });
}

async function loginToMsfRpc(credentials, loader) {
  useMsfAuth()
    .login(credentials)
    .then(async () => {
      await useMetasploitModules.fetchAllModules();
      router.push("/");
      loader.hide();
    })
    .catch((err) => {
      if (err) {
        loader.hide();
        ToastService.showToast(err.response.data.message, "error");
      }
    });
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
