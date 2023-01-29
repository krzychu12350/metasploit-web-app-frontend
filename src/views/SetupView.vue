<template>
  <div class="min-h-full flex">
    <div
      class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-12 mx-auto"
            src="../assets/metasploit-framework-logo.svg"
            alt="Workflow"
          />
          <h2 class="text-center mt-6 text-3xl font-extrabold text-gray-800">
            To start connect with Metasploit RPC
          </h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form action="#" method="POST" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-800">
                  User name
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="User name"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-800">
                  Password
                </label>
                <div class="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autocomplete="current-password"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-800">
                  IP Address
                </label>
                <div class="mt-1">
                  <input
                    id="ip-address"
                    name="password"
                    type="text"
                    placeholder="IP Address"
                    autocomplete="current-password"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-800">
                  Port
                </label>
                <div class="mt-1">
                  <input
                    id="port"
                    name="password"
                    type="text"
                    placeholder="Port"
                    autocomplete="current-password"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <SwitchGroup as="div" class="flex items-center">
                <Switch
                  v-model="enabled"
                  :class="[
                    enabled ? 'bg-gray-800' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      enabled ? 'translate-x-5' : 'translate-x-0',
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
                  @click.prevent="connectWithMsf"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="../assets/anonymous.jpg"
        alt=""
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { useMsfAuth } from "../stores/useMsfAuth";
import ToastService from "../services/ToastService";
import { useRouter } from "vue-router";

const enabled = ref(false);
const router = useRouter();

function connectWithMsf() {
  const credentials = {
    myUserName: "user",
    myPassword: "pass123",
  };
  console.log(credentials);

  useMsfAuth()
    .login(credentials)
    .then(() => {
      router.push("/");
      //loader.hide();
    });
}
</script>

<style>
.setup-container {
  background-image: url("../assets/anonymous.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
