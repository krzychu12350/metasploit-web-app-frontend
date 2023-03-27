<template>
  <span class="relative z-0 inline-flex shadow-sm rounded-md">
    <button
      type="button"
      v-tooltip.top="'Add a new host'"
      @click="emit('showAddingNewHostModal')"
      class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <PlusCircleIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
      Add host
    </button>
    <button
      type="button"
      @click="emit('showImportingDataModal')"
      v-tooltip.top="'Import a scan result file (filetype will be auto-detected)'"
      class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <ArrowDownTrayIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
      Import data
    </button>
    <button
      type="button"
      v-tooltip.top="'Export a file containing the contents of the database'"
      @click="emit('showExportingDataModal')"
      class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <ArrowDownTrayIcon
        class="rotate-180 -ml-1 mr-2 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      Export data
    </button>
    <button
      type="button"
      @click="emit('showMsfTcpPortScannerConfigModal')"
      class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <MagnifyingGlassIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
      MSF Scans...
    </button>
    <!--
    <button
      type="button"
      class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <TrashIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
      Clear hosts
    </button>
    -->
    <button
      type="button"
      class="flex -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <MagnifyingGlassPlusIcon
        class="-ml-1 mr-2 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      Nmap scan..
    </button>
    <Menu as="span" class="-ml-px relative block">
      <MenuButton
        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <span class="sr-only">Open options</span>
        <ArrowDownIcon class="h-5 w-5" aria-hidden="true" />
      </MenuButton>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="origin-top-right absolute right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem class="hover:bg-gray-100 text-left">
              <button
                @click="emit('showNmapScanSettingsModal', { scan_type: 'quick' })"
                class="text-gray-700 block px-4 py-2 text-sm w-full"
              >
                Quick scan
              </button>
            </MenuItem>
            <MenuItem class="hover:bg-gray-100 text-left">
              <button
                @click="emit('showNmapScanSettingsModal', { scan_type: 'aggressive' })"
                class="text-gray-700 block px-4 py-2 text-sm w-full"
              >
                Aggressive scan
              </button>
            </MenuItem>
            <MenuItem class="hover:bg-gray-100 text-left">
              <button
                @click="emit('showNmapScanSettingsModal', { scan_type: 'os detection' })"
                class="text-gray-700 block px-4 py-2 text-sm w-full"
              >
                OS Detection scan
              </button>
            </MenuItem>
            <MenuItem class="hover:bg-gray-100 text-left">
              <button
                class="text-gray-700 block px-4 py-2 text-sm w-full"
                @click="emit('showNmapScanSettingsModal', { scan_type: 'custom' })"
              >
                Custom scan (Advanced)
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <!--
    <button
      type="button"
      class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
    >
      <BookmarkIcon class="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
      Clear hosts
    </button>
    -->
  </span>
</template>
<script setup>
import {
  BookmarkIcon,
  PlusCircleIcon,
  MapIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ArrowDownIcon } from "@heroicons/vue/24/solid";
import useEventsBus from "../../composables/eventBus";
const items = ref([
  { name: "Quick scan", href: "#" },
  { name: "Ping scan", href: "#" },
  { name: "Custom scan", href: "#" },
]);

const { emit } = useEventsBus();
</script>
