<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Platform
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(exploit, index) in displayedUsers">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ exploit.type }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <p class="break-normal"></p>
                  {{ exploit }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ exploit.platform }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ exploit.rank }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- Pagination -->
  <nav class="text-center mt-4" aria-label="Page navigation">
    <ul class="pagination pagination-sm flex justify-center">
      <li class="mx-2">
        <a href="#" @click="page = 1" aria-label="First">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="mx-2">
        <a href="#" v-if="page != 1" @click="page--" aria-label="Previous">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li
        v-for="pageNumber in pages.slice(page - 1, page + 4)"
        :class="{ active: page === pageNumber }"
        class="mx-2"
      >
        <a href="#" @click="page = pageNumber">{{ pageNumber }}</a>
      </li>
      <li class="mx-2">
        <a href="#" @click="page++" v-if="page < pages.length" aria-label="Next">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li class="mx-2">
        <a href="#" @click="page = pages.length" aria-label="Last">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModuleDataService from "@/services/ModuleDataService";
const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
  // More people...
];

export default defineComponent({
  setup() {
    return {
      people,
    };
  },
  components: {},
  data() {
    return {
      currentDisplayExploits: [] as any[],
      singleModule: Object,
      users: [] as any[],
      loading: true,
      errored: false,
      page: 1,
      perPage: 10,
      pages: [] as any[],
    };
  },
  mounted() {
    this.fetchDetailsForAllExploits();
  },

  methods: {
    async getAllExploits() {
      return ModuleService.exploits()
        .then((response) => {
          //let exploits = response.data.data.modules;
          /*
          exploits.forEach((exploitName: String) => {
            console.log(exploitName);
            //this.getExploitDetails(exploitName);
          });
            this.exploits = exploits;
          console.log(exploits);
          */
          //this.exploits = response.data.data.modules;
          return response.data.data.modules;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getExploitDetails(exploitName: String) {
      let data = {
        moduleName: exploitName,
        moduleType: "exploits",
      };

      return ModuleService.info(data)
        .then((response) => {
          //this.singleModule = response.data.data;
          return response.data.data;
          //console.log(this.singleModule);
          //console.log("tutaj");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async fetchDetailsForAllExploits() {
      let allExploitsArray = await this.getAllExploits();
      //console.log(allExploitsArray);

      this.users = allExploitsArray;

      //console.log("dupa");
      //console.log(this.users);
      //const arr = Array.from(this.exploits);
      //console.log(this.exploits);

      //arr.forEach((element) => console.log(element));
      //this.exploits = this.getAllExploits();

      this.paginate(this.users);
      /*
      allExploitsArray.forEach((x: String) => {
        //console.log(x);
       // this.getExploitDetails(x);
      });
      */
    },
    setPages() {
      let numberOfPages = Math.ceil(this.users.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(users: any[]) {
      var page = this.page;
      var perPage = this.perPage;
      var from = page * perPage - perPage;
      var to = page * perPage;

      let slicedModules = users.slice(from, to);
      const currentModules: any[] = [];

      slicedModules.forEach((x: any) => {
        /// console.log(x);
        currentModules.push(x);
        let a = this.getExploitDetails("aix/local/ibstat_path");
        console.log(a);
        //currentModules.push(a);
        //this.getExploitDetails(x);
      });

      //console.log(currentModules);
      this.currentDisplayExploits = currentModules;

      return currentModules;
    },
  },
  created() {
    //this.getUsers();
  },
  watch: {
    async users() {
      this.setPages();
    },
  },
  computed: {
    displayedUsers() {
      return this.paginate(this.users);
    },
  },
  /*
  filters: {
    lowercase(value: string) {
      return value.toLowerCase();
    },
    capitalize(value: string) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  */
});
</script>
