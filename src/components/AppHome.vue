<template>
  <div class="w-300 h-200 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div class="w-full p-6 border-b-2 border-gray-200">
      <p class="text-4xl font-black text-gray-900 dark:text-white">Users</p>
    </div>
    <div class="w-full p-8">
      <div class="w-full flex justify-between p-4">
        <form class="w-100">
          <label for="pet-select">Filter by email:</label>
          <select name="users-email" id="email-select" v-model="filters.email"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">-Choose an email--</option>
            <option v-for="email in emails" :key="email" :value="email">{{ email }}</option>
          </select>
        </form>
        <div class="w-100">
          <label for="name">Filter by userame:</label>
          <input type="text" id="simple-search" v-model="filters.username"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your username..." requiredv-model="filters.username" />
        </div>
      </div>
      <UserTable :users="users" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, watch, computed, onMounted } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router'
import type { LocationQueryValue } from 'vue-router'
import { Params } from '@/types';


import UserTable from './UserTable.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

// Computed getters from Vuex store
const users = computed(() => store.getters.users);
const emails = computed(() => store.getters.emails);

// Helper function to get the first value from query params
function getQueryStringValue(value: LocationQueryValue | LocationQueryValue[] | undefined): string {
  if (Array.isArray(value)) return value[0] || ''
  return value || ''
}

// Initialized with values from the URL query parameters
const filters = ref<Params>({
  email: getQueryStringValue(route.query.email),
  username: getQueryStringValue(route.query.username)
})

// Fetch all users when component is mounted
onMounted(async () => {
  await store.dispatch('fetchUsers');
})

// Debounced function to handle filtering users
const debouncedFilter = useDebounceFn(async (filtersObj: Params) => {
  const queryParams: Params = {}

  if (filtersObj.username) {
    queryParams.username = filtersObj.username
  }
  if (filtersObj.email) {
    queryParams.email = filtersObj.email
  }

// Update the URL query params without reloading the page
  router.replace({
    path: route.path,
    query: queryParams
  })

  // Fetch filtered users from the store
  await store.dispatch('filterUsers', queryParams)
}, 300)

// Watch the filters object for changes
watch(
  filters,
  async (newFilters) => {
    debouncedFilter(newFilters)
  },
  { deep: true }
)

// Watch route.query to keep filters in sync with the URL
watch(
  () => route.query,
  (newQuery) => {
    filters.value.email = getQueryStringValue(newQuery.email)
    filters.value.username = getQueryStringValue(newQuery.username)
  }
)
</script>
