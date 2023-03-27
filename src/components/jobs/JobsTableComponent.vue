<template>
  <div class="px-4 sm:px-6 lg:px-8 mt-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Active jobs</h1>
        <p class="mt-2 text-sm text-gray-700">A list of active jobs</p>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Jid
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Start datatime
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Payload
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    LHOST
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    LPORT
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    ExitOnSession
                  </th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  v-for="(job, jobIdx) in result"
                  :key="job"
                  :class="jobIdx % 2 === 0 ? undefined : 'bg-gray-50'"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ job.jid }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ job.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ moment.unix(job.start_time).format("LLL") }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ job.datastore.PAYLOAD }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ job.datastore.LHOST }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ job.datastore.LPORT }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ job.datastore.ExitOnSession }}
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <XMarkIcon
                      class="flex-shrink-0 h-5 w-5 mr-2 text-gray-700 hover:text-gray-900 cursor-pointer"
                      @click="emit('showJobKillingModal', { jobId: job.jid })"
                      aria-hidden="true"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <nav
              class="bg-white px-4 py-3 flex items-center justify-between sm:px-6"
              aria-label="Pagination"
            >
              <div class="hidden sm:block">
                <p class="text-sm text-gray-700">
                  Page
                  {{ " " }}
                  <span class="font-medium">{{ currentPage }}</span>
                  {{ " " }}
                  of
                  {{ " " }}
                  <span class="font-medium">{{ lastPage }}</span>
                </p>
              </div>
              <div class="flex-1 flex justify-between sm:justify-end">
                <button
                  @click="prev"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="next()"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch, onBeforeMount } from "vue";
import JobDataService from "../../services/JobDataService";
import moment from "moment";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";
import { useArrayPagination } from "vue-composable";

const { bus, emit } = useEventsBus();
let jobs = ref([]);
const jobsDetails = ref([]);
let jobsList = ref([]);

const $loading = inject("$loading");

const { result, next, prev, currentPage, lastPage } = useArrayPagination(jobsList, {
  pageSize: 5,
});

async function getAllJobs() {
  const loader = $loading.show();
  return JobDataService.list().then((res) => {
    loader.hide();
    return res.data.data;
  });
}

async function getJobsDetails() {
  const loader = $loading.show();
  const jobsIds = Object.keys(jobs.value);
  jobsList.value = [];
  jobsIds.forEach(async (id) => {
    const jobData = { job_id: id };
    delete jobs.value[id];
    jobs.value[id] = await JobDataService.info(jobData)
      .then((res) => {
        jobsList.value.push(res.data.data);
        return res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  });
  loader.hide();
}

async function fetchJobs(jobsDetails) {
  jobs.value = await getAllJobs();
  await getJobsDetails();
  prev();
}

onBeforeMount(async () => {
  fetchJobs();
});

watch(
  () => bus.value.get("refreshJobTable"),
  () => {
    fetchJobs();
  }
);
</script>
