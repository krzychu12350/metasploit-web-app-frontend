<template>
  <div class="px-4 sm:px-6 lg:px-8 mt-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Active jobs</h1>
        <p class="mt-2 text-sm text-gray-700">A list of active jobs</p>
      </div>
      <!--
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto">Add session</button>
            </div>
            -->
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr
                  v-for="(job, jobIdx) in jobs"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onBeforeMount, onMounted } from "vue";
import JobDataService from "../../services/JobDataService";
import moment from "moment";
import ToastService from "../../services/ToastService";
import { PencilIcon, XMarkIcon, CalculatorIcon } from "@heroicons/vue/24/outline";
import useEventsBus from "../../composables/eventBus";

const { bus, emit } = useEventsBus();
const jobs = ref([]);
const jobsDetails = ref([]);

async function getAllJobs() {
  return JobDataService.list().then((res) => {
    //console.log(res.data);
    return res.data.data;
  });
}

async function getJobsDetails() {
  //console.log(Object.keys(jobs.value));
  const jobsIds = Object.keys(jobs.value);
  //let test = [];
  jobsIds.forEach(async (id) => {
    console.log(id);
    const jobData = { job_id: id };
    //console.log(jobData);
    //const obj = Object.entries(jobs.value).find((key) => key === id);
    //console.log(obj);
    delete jobs.value[id];
    jobs.value[id] = await JobDataService.info(jobData)
      .then((res) => {
        console.log(res.data.data);
        return res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    //jobs.value[id] = fetchedJobDetails;
    //console.log(jobs.value[id]);
    //console.log(fetchedJobDetails);
    //console.log(fetchedJobDetails);
    //test.push(fetchedJobDetails);
    //await jobsDetails.push(fetchedJobDetails);
  });
  //return test;
}

async function fetchJobs(jobsDetails) {
  jobs.value = await getAllJobs();
  await getJobsDetails();

  console.log(jobs.value);
}
onMounted(() => {});

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
<style scoped></style>
