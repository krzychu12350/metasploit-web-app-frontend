<template>
  <div class="min-h-full">
    <NavbarComponent />
    <BreadcrumbComponent />
    <!--
        <header class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 class="text-lg leading-6 font-semibold text-gray-900">Dashboard</h1>
            </div>
        </header>
        -->
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content
                <div class="px-4 py-4 sm:px-0">
                    <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div>
                 /End replace -->

        <div
          class="bg-white shadow overflow-hidden sm:rounded-lg overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
        >
          <div class="px-4 py-5 sm:px-6">
            <!--
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                        -->
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
                <span class="text-sm font-medium text-gray-900">Console mode </span>
                <span class="text-sm text-gray-500">(Command prompt)</span>
              </SwitchLabel>
            </SwitchGroup>
            <div class="mt-4" v-if="enabled">
              <div class="relative pb-5 border-b border-gray-200 sm:pb-0">
                <div class="md:flex md:items-center md:justify-between">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Consoles
                    <br />
                    Current Console {{ currentConsole }}
                  </h3>

                  <div class="mt-3 flex md:mt-0 md:absolute md:top-3 md:right-0">
                    <button
                      @click="destroySpecificConsole(8)"
                      type="button"
                      class="inline-flex items-center px-4 py-2 border border-red-600 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove current console
                    </button>
                    <button
                      @click="createNewConsole"
                      type="button"
                      class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Create new console
                    </button>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="sm:hidden">
                    <label for="current-tab" class="sr-only">Select a tab</label>
                    <select
                      id="current-tab"
                      name="current-tab"
                      class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option
                        v-for="tab in consoles"
                        :key="tab.name"
                        :selected="tab.current"
                      >
                        {{ tab.name }}
                      </option>
                    </select>
                  </div>
                  <div class="hidden sm:block">
                    <nav class="-mb-px flex space-x-8">
                      <a
                        v-for="tab in consolesFromAPI"
                        @click="getSpecificConsoleData(tab, tab.id)"
                        :key="tab.id"
                        :class="[
                          isActiveConsole
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm',
                        ]"
                        :aria-current="isActiveConsole ? 'page' : undefined"
                      >
                        Console {{ tab.id }}
                      </a>
                    </nav>
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <!--
                                <span class="text-black" v-for="console in this.consolesFromAPI" :key="console.id">
                                    {{console.id}}
                                </span>
                                -->
                <!--{{specificConsoleData}}-->
                {{ specificConsoleData.prompt }}
                {{ specificConsoleData.data }}

                <div>
                  <div class="mt-1 flex">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      v-model="text"
                      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                      placeholder="Type in terminal..."
                    />
                    <button
                      @click="sendCommandToSpecificTerminal(this.currentConsole)"
                      type="submit"
                      class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Send to terminal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

import BreadcrumbComponent from "../components/BreadcrumbComponent.vue";
import SessionsTableComponent from "../components/sessions/SessionsTableComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
import ConsoleDataService from "../services/ConsoleDataService";

import ToastService from "../services/ToastService";

const consoles = [
  { name: "Console 0", href: "#", current: true },
  { name: "Console 1", href: "#", current: false },
];

export default defineComponent({
  name: "SingleSessionView",
  components: {
    NavbarComponent,
    BreadcrumbComponent,
    SessionsTableComponent,

    Switch,
    SwitchGroup,
    SwitchLabel,
  },
  setup() {
    const enabled = ref(false);

    return {
      enabled,
      consoles,
    };
  },
  data() {
    return {
      consolesFromAPI: Array,
      specificConsoleData: Array,
      text: String,
      currentConsole: Number,
      isActiveConsole: false,
    };
  },
  mounted() {
    //this.getConsoles();
  },
  methods: {
    /*
      async getConsoles() {
          await ConsolesService.getAll()
              .then((response) => {
                  this.consolesFromAPI = response.data.consoles
                  console.log(this.consolesFromAPI)
              })
              .catch(err => console.log(err.message))
      },
        async createNewConsole() {
          //alert("dziala")

            await ConsolesService.create()
                .then((response) => {
                    console.log(response.data)
                    //alert(response.data.message)
                    ToastService.showToast(response.data.message, 'default')
                    this.getConsoles()
                })
                .catch(err => console.log(err.message))
        },
        async getSpecificConsoleData(event, id) {
         // alert("test" + id)

            this.currentConsole = id
            console.log(this.currentConsole)
            this.isActiveConsole = !this.isActiveConsole
            await ConsolesService.get(id)
                .then((response) => {
                    console.log(response.data.data)
                    this.specificConsoleData = response.data.data

                    //alert(response.data.message)
                    //this.getConsoles()

                })
                .catch(err => console.log(err.message))
        },
        async destroySpecificConsole(id) {
            // alert("test" + id)
            await ConsolesService.delete(this.currentConsole)
                .then((response) => {
                    //alert(response.data.message)
                    ToastService.showToast(response.data.message, 'default')
                    this.getConsoles()
                    //alert(response.data.message)
                    //this.getConsoles()
                })
                .catch(err => console.log(err.message))
        },
        async sendCommandToSpecificTerminal(id) {
          //alert("terminal " + id + " " + this.text)

            await ConsolesService.update(id, {"data-to-write": this.text})
                .then((response) => {
                    //alert(response.data.message)
                    console.log(response.data.consoleResponse.data)
                    this.specificConsoleData = response.data.consoleResponse
                    this.currentConsole = !this.currentConsole
                    console.log(this.currentConsole)
                    ToastService.showToast(response.data.message, 'default')
                    //console.log(this.specificConsoleData)
                    //this.getSpecificConsoleData(id)
                    //alert(response.data.message)
                    //this.getConsoles()
                })
                .catch(err => console.log(err.message))

        }
        */
  },
});
</script>
