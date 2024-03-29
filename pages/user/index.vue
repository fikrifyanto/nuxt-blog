<template>
  <div class="max-w-6xl px-6 mx-auto min-h-screen py-6 lg:py-20">
    <!-- Toolbar -->
    <div class="flex justify-between items-center mb-8">
      <NuxtLink
        class="bg-[#FF8911] text-white py-3 px-4 font-ibm-plex-sans font-semibold rounded-md"
        to="/user/create">
        Add User
      </NuxtLink>
      <div class="flex items-center gap-4">
        <label for="display">Display</label>
        <select
          id="display"
          v-model="users.per_page"
          class="outline-[#7d27ffe0] rounded-md py-2 px-3 border border-gray-300 font-medium font-ibm-plex-sans w-24 text-center"
          placeholder="Lokasi">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-scroll border border-slate-200">
      <table class="lg:table-fixed w-full border-collapse rounded-lg">
        <!-- Header -->
        <thead class="bg-slate-50 border-b">
          <tr>
            <th class="font-semibold font-raleway p-5">Name</th>
            <th class="font-semibold font-raleway p-5">Email</th>
            <th class="font-semibold font-raleway p-5">Gender</th>
            <th class="font-semibold font-raleway p-5">Status</th>
            <th class="font-semibold font-raleway p-5">Action</th>
          </tr>
          <tr>
            <th class="p-4 pt-0">
              <input
                placeholder="Search Name.."
                v-model="users.search.name"
                class="outline-[#7d27ffe0] rounded-md py-2 px-3 border border-gray-300 font-medium font-ibm-plex-sans"
                type="text" />
            </th>
            <th class="p-4 pt-0">
              <input
                placeholder="Search Email.."
                v-model="users.search.email"
                class="outline-[#7d27ffe0] rounded-md py-2 px-3 border border-gray-300 font-medium font-ibm-plex-sans"
                type="text" />
            </th>
            <th class="p-4 pt-0">
              <select
                v-model="users.search.gender"
                class="outline-[#7d27ffe0] rounded-md py-2 px-3 border border-gray-300 font-medium font-ibm-plex-sans"
                placeholder="Lokasi">
                <option value="" selected>All Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </th>
            <th class="p-4 pt-0">
              <select
                v-model="users.search.status"
                class="outline-[#7d27ffe0] rounded-md py-2 px-3 border border-gray-300 font-medium font-ibm-plex-sans"
                placeholder="Lokasi">
                <option value="" selected>All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </th>
            <th></th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <tr v-if="!users.loading" class="hover:bg-slate-50" v-for="user in users.data">
            <td class="font-ibm-plex-sans text-slate-900 p-5 break-all">
              {{ user.name }}
            </td>
            <td class="font-ibm-plex-sans text-slate-900 p-5 break-all">
              {{ user.email }}
            </td>
            <td class="font-ibm-plex-sans text-slate-900 p-5 break-all text-center">
              {{ app.$capitalizeFirstLetter(user.gender) }}
            </td>
            <td class="font-ibm-plex-sans text-slate-900 p-5 break-all text-center">
              {{ app.$capitalizeFirstLetter(user.status) }}
            </td>
            <td>
              <div class="flex flex-col lg:flex-row justify-center items-center lg:gap-4">
                <NuxtLink :to="`/user/${user.id}/edit`" class="text-yellow-500">Edit</NuxtLink>
                <button
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  type="button"
                  @click="openModal(true, user.id)"
                  class="text-red-500">
                  Hapus
                </button>
              </div>
            </td>
          </tr>
          <tr v-else>
            <td colspan="5">
              <!-- Loading -->
              <Loading />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <Pagination
      v-show="users.totalPages > 1"
      :page="users.page"
      :total-pages="users.totalPages"
      :loading="users.loading"
      @next="users.page++"
      @previous="users.page--"
      @to="users.page = $event" />
  </div>

  <!-- Confirmation Delete User Modal -->
  <Modal
    title="Are you sure to delete this user?"
    confirm-text-button="Yes, Delete it!"
    cancel-text-button="Cancel"
    :open="isModalOpen"
    :id="modalId"
    @close="isModalOpen = false"
    @confirm="deleteUser($event)" />
</template>

<script setup lang="ts">
useHead({
  title: "List Users",
})

const config = useRuntimeConfig()
const app = useNuxtApp()

const users = ref<any>({
  page: 1,
  totalPages: 0,
  data: 0,
  loading: true,
  per_page: 10,
  search: {
    name: null,
    email: null,
    gender: "",
    status: "",
  },
})

const modalId = ref<string | number>()
const isModalOpen = ref<boolean>(false)

async function fetchUsers() {
  users.value.loading = true

  const response = await $fetch.raw(`${config.public.API_URL}/public/v2/users`, {
    params: {
      page: users.value.page,
      name: users.value.search.name,
      email: users.value.search.email,
      gender: users.value.search.gender,
      status: users.value.search.status,
      per_page: users.value.per_page,
    },
  })

  const currentPage = response.headers.get("X-Pagination-Page")
  if (currentPage) {
    users.value.page = parseInt(currentPage)
  }

  const totalPage = response.headers.get("X-Pagination-Pages")
  if (totalPage) {
    users.value.totalPages = parseInt(totalPage)
  }

  users.value.loading = false
  users.value.data = response._data
}

function openModal(open: boolean = true, id: string | number | null = null) {
  isModalOpen.value = open
  if (id) modalId.value = id
}

async function deleteUser(userId: number) {
  await $fetch(`https://gorest.co.in/public/v2/users/${userId}`, {
    headers: {
      Authorization: "Bearer " + process.env.API_TOKEN,
    },
    method: "DELETE",
  })

  openModal(false)
  fetchUsers()
}

watch(
  () => users.value.page,
  () => {
    fetchUsers()
  }
)

watch(
  () => users.value.search.name,
  () => {
    fetchUsers()
  }
)

watch(
  () => users.value.search.email,
  () => {
    fetchUsers()
  }
)

watch(
  () => users.value.search.gender,
  () => {
    fetchUsers()
  }
)

watch(
  () => users.value.search.status,
  () => {
    fetchUsers()
  }
)

watch(
  () => users.value.per_page,
  () => {
    fetchUsers()
  }
)

fetchUsers()
</script>
