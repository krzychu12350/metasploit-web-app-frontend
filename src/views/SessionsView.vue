<template>
  <!--
  <NavbarComponent />
  <BreadcrumbComponent />
  <div class="min-h-full">

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    
        
      </div>
    </main>
  </div>
  -->
  <ViewBaseComponent>
    <template v-slot:subpage-header>
      <BreadcrumbComponent subpageName="Sessions"
    /></template>
    <template v-slot:subpage-content>
      <SessionsTableComponent></SessionsTableComponent>
      <SessionKillingModal></SessionKillingModal>
    </template>
  </ViewBaseComponent>
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
import {
  MagnifyingGlassIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import ActionsComponent from "../components/ActionsComponent.vue";
import ViewBaseComponent from "../components/ViewBaseComponent.vue";
import SessionsTableComponent from "../components/sessions/SessionsTableComponent.vue";
import SessionKillingModal from "../components/sessions/SessionKillingModal.vue";

import NavbarComponent from "../components/NavbarComponent.vue";

const user = {
  name: "Anonymous",
  email: "anonymous@collective.com",
  imageUrl: "../assets/anonymous.png",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Analysis", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Jobs", href: "#", current: false },
  { name: "Sessions", href: "#", current: false },
  { name: "Payload generator", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
/*
export default defineComponent({
  name: "SessionsView",
  components: {
    NavbarComponent,
    SessionsTableComponent,
    ActionsComponent,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    //PlusSmIcon,
    BellIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    BreadcrumbComponent,
  },
  setup() {
    return {
      user,
      navigation,
      userNavigation,
    };
  },
});
*/
</script>
