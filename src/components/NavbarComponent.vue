<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="block lg:hidden h-8 w-auto" src="/logo.svg" alt="Workflow" />
            <img class="hidden lg:block h-8 w-auto" src="/logo.svg" alt="Workflow" />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <RouterLink
                to="/"
                active-class="bg-gray-900"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Dashboard</RouterLink
              >
              <RouterLink
                to="/hosts"
                active-class="bg-gray-900"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Hosts</RouterLink
              >
              <RouterLink
                to="/jobs"
                active-class="bg-gray-900"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Jobs</RouterLink
              >
              <RouterLink
                to="/sessions"
                active-class="bg-gray-900"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Sessions</RouterLink
              >
              <!--
              <RouterLink
                to="/analysis"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Analysis</RouterLink
              >
              -->
              <RouterLink
                to="/modules"
                active-class="bg-gray-900"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Modules</RouterLink
              >
              <RouterLink
                to="/scripts"
                active-class="bg-gray-900"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Scripts</RouterLink
              >
              <RouterLink
                to="/rpc-connections"
                active-class="bg-gray-900"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >RPC Connections</RouterLink
              >
              <!--
              <RouterLink
                to="/plugins"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Plugins</RouterLink
              >
              -->
              <RouterLink
                to="/workspaces"
                active-class="bg-gray-900"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Workspaces</RouterLink
              >

              <!--
                        <DisclosureButton
          as="a"
          href="/"
          class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >Dashboard</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/hosts"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Hosts</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/jobs"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Jobs</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Sessions</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/analysis"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Analysis</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/modules"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Modules</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/rpc-connections"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >RPC Connections</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/plugins"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Plugins</DisclosureButton
        >
        -->
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="cursor-pointer ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        </div>
        <div class="-mr-2 flex sm:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <DisclosureButton
          as="a"
          href="/"
          active-class="bg-gray-900"
          class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >Dashboard</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/hosts"
          active-class="bg-gray-900"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Hosts</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/jobs"
          active-class="bg-gray-900"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Jobs</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/sessions"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Sessions</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/analysis"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Analysis</DisclosureButton
        >
        <!--
        <DisclosureButton
          as="a"
          href="/modules"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Modules</DisclosureButton
        >
        -->
        <DisclosureButton
          as="a"
          href="/scripts"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Scripts</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/rpc-connections"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >RPC Connections</DisclosureButton
        >
        <DisclosureButton
          as="a"
          href="/workspaces"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Workspaces</DisclosureButton
        >

        <!--
        <DisclosureButton
          as="a"
          href="/plugins"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Plugins</DisclosureButton
        >
        -->
      </div>
      <div class="pt-4 pb-3 border-t border-gray-700">
        <!--
        <div class="flex items-center px-5">
        
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="/logo.svg" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">Tom Cook</div>
            <div class="text-sm font-medium text-gray-400">tom@example.com</div>
          </div>
          <button
            type="button"
            class="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        
        </div>
          -->
        <div class="mt-3 px-2 space-y-1">
          <button
            @click="handleLogout"
            class="cursor-pointer w-full inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Logout
          </button>
          <!--
          <DisclosureButton
            as="a"
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >Your Profile</DisclosureButton
          >
      
          <DisclosureButton
            as="a"
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >Settings</DisclosureButton
          >
          <DisclosureButton
            as="a"
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >Sign out</DisclosureButton
          >
          -->
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useMsfModules } from "../stores/useMsfModules";
import { useMsfConsoles } from "../stores/useMsfConsoles";
import { ref, inject } from "vue";
import { useMsfAuth } from "../stores/useMsfAuth";
import { useRouter } from "vue-router";

const router = useRouter();
const useMetasploitModules = useMsfModules();
const useConsoles = useMsfConsoles();
const $loading = inject("$loading");
const fullPage = ref(true);

function handleLogout() {
  const loader = $loading.show();
  useMsfAuth()
    .logout()
    .then(() => {
      router.push("/setup");
      loader.hide();
    })
    .catch((err) => {
      loader.hide();
      console.log(err.response.data);
    });
  useMetasploitModules.clearAllMsfModules();
  useConsoles.clearMsfConsolesData();
}
</script>
