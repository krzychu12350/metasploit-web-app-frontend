<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">Active sessions</h1>
                <p class="mt-2 text-sm text-gray-700">A list of active sessions</p>
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
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Session</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">OS</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Attack module</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody class="bg-white">
                            <tr v-for="(session, sessionIdx) in sessions" :key="session.type" :class="sessionIdx % 2 === 0 ? undefined : 'bg-gray-50'">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ session.sessionId }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ session.os }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ session.type }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ session.attackModule }}</td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <router-link to="/sessions/1" class="text-gray-800 hover:text-gray-600"
                                    >Go<span class="sr-only">, {{ session.sessionId }}</span></router-link
                                    >
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-8 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-xl font-semibold text-gray-900">Closed sessions</h1>
                <p class="mt-2 text-sm text-gray-700">A list of closed sessions</p>
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
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Session</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">OS</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Attack module</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Remove</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody class="bg-white">
                            <tr v-for="(session, sessionIdx) in sessions" :key="session.type" :class="sessionIdx % 2 === 0 ? undefined : 'bg-gray-50'">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ session.sessionId }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ session.os }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ session.type }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ session.attackModule }}</td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="#" class="text-gray-800 hover:text-gray-600"
                                    >Remove<span class="sr-only">, {{ session.sessionId }}</span></a
                                    >
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

<script lang="ts">
import { defineComponent } from "vue";
import { HomeIcon } from '@heroicons/vue/24/solid'

const sessions = [
    { sessionId: 'Session 1', os: 'Windows 10', type: 'Meterpreter', attackModule: 'windows/meterpreter/reverse_tcp' },
]


export default defineComponent({
    name: "SessionsComponent",
    components: {
    },
    setup() {
        return {
            sessions,
        }
    },
})
</script>
<style scoped>

</style>
