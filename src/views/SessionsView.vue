<template>
  <NavbarComponent />
  <BreadcrumbComponent />
  <div class="min-h-full">
    <!--<ActionsComponent />-->
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content
                <div class="px-4 py-4 sm:px-0">
                    <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
                 /End replace -->

        <SessionsTableComponent></SessionsTableComponent>
        <SessionKillingModal></SessionKillingModal>
      </div>
    </main>
  </div>
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
