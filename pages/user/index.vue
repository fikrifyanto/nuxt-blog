<template>
  <div class="max-w-6xl mx-auto min-h-screen py-20">
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
    <div class="border border-slate-200 rounded-lg shadow">
      <table class="table-fixed w-full border-collapse">
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
        <tbody>
          <tr v-if="!users.loading" class="hover:bg-slate-50" v-for="user in users.data">
            <td class="font-ibm-plex-sans text-slate-900 p-5">
              {{ user.name }}
            </td>
            <td class="font-ibm-plex-sans text-slate-900 p-5">
              {{ user.email }}
            </td>
            <td class="font-ibm-plex-sans text-slate-900 p-5 text-center">
              {{ user.gender }}
            </td>
            <td class="font-ibm-plex-sans text-slate-900 p-5 text-center">
              {{ user.status }}
            </td>
            <td class="p-5">
              <NuxtLink :to="`/user/${user.id}/edit`" class="text-yellow-500">Edit</NuxtLink>
              <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                type="button"
                @click="deleteUser(user.id)"
                class="pl-4 text-red-500">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-show="users.loading" class="h-72 flex justify-center items-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-10 w-10 text-[#7d27ffe0]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div v-show="users.data" class="flex justify-center py-8 border-t">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
          <button
            type="button"
            @click="users.page--"
            :class="{
              'bg-gray-100': users.page == 1 || users.loading,
            }"
            :disabled="users.page == 1 || users.loading"
            class="cursor-normal relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-l-md hover:bg-gray-50">
            <span class="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="w-5 h-5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"></path>
            </svg>
          </button>
          <button
            type="button"
            @click="users.page = 1"
            :class="{
              'border-[#7d27ffe0]': users.page == 1,
            }"
            class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
            1
          </button>

          <template v-if="users.page <= 2 || users.page >= users.totalPages - 1">
            <button
              type="button"
              @click="users.page = 2"
              :class="{
                'border-[#7d27ffe0]': users.page == 2,
              }"
              class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
              2
            </button>
            <span
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border">
              ...
            </span>
            <button
              type="button"
              @click="users.page = users.totalPages - 1"
              :class="{
                'border-[#7d27ffe0]': users.page == users.totalPages - 1,
              }"
              class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
              {{ users.totalPages - 1 }}
            </button>
          </template>

          <template v-else>
            <span
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border">
              ...
            </span>
            <button
              type="button"
              @click="users.page = users.page - 1"
              :class="{
                'border-[#7d27ffe0]': users.page == users.page - 1,
                'bg-gray-100': users.loading,
              }"
              :disabled="users.loading"
              class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
              {{ users.page - 1 }}
            </button>
            <button
              type="button"
              @click="users.page = users.page"
              :class="{
                'border-[#7d27ffe0]': users.page == users.page,
                'bg-gray-100': users.loading,
              }"
              :disabled="users.loading"
              class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
              {{ users.page }}
            </button>
            <button
              type="button"
              @click="users.page = users.page + 1"
              :class="{
                'border-[#7d27ffe0]': users.page == users.page + 1,
                'bg-gray-100': users.loading,
              }"
              :disabled="users.loading"
              class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
              {{ users.page + 1 }}
            </button>
            <span
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border">
              ...
            </span>
          </template>

          <button
            type="button"
            @click="users.page = users.totalPages"
            :disabled="users.loading"
            :class="{
              'border-[#7d27ffe0]': users.page == users.totalPages,
              'bg-gray-100': users.loading,
            }"
            class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
            {{ users.totalPages }}
          </button>
          <button
            type="button"
            @click="users.page++"
            :class="{
              'bg-gray-100': users.page == users.totalPages || users.loading,
            }"
            :disabled="users.page == users.totalPages || users.loading"
            class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border rounded-r-md hover:bg-gray-50">
            <span class="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              class="w-5 h-5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>

  <!-- Confirmation Delete User Modal -->
  <div
    id="popup-modal"
    tabindex="-1"
    class="hidden overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full bg-black/50">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          data-modal-hide="popup-modal">
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete this user?
          </h3>
          <button
            id="confirm-delete"
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
            Yes, I'm sure
          </button>
          <button
            @click="openModal(false)"
            data-modal-hide="popup-modal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-100">
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "List Users",
})

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

async function fetchUsers() {
  users.value.loading = true

  const response = await $fetch.raw(`https://gorest.co.in/public/v2/users`, {
    params: {
      page: users.value.page,
      name: users.value.search.name,
      email: users.value.search.email,
      gender: users.value.search.gender,
      status: users.value.search.status,
      per_page: users.value.per_page,
    },
  })

  users.value.loading = false
  users.value.page = response.headers.get("X-Pagination-Page")
  users.value.totalPages = response.headers.get("X-Pagination-Pages")
  users.value.data = response._data
}

function openModal(open: boolean = true) {
  const popupModal = document.querySelector("#popup-modal")
  if (open) {
    popupModal?.classList.remove("hidden")
    popupModal?.classList.add("flex")
  } else {
    popupModal?.classList.remove("flex")
    popupModal?.classList.add("hidden")
  }
}

async function deleteUser(userId: number) {
  openModal()

  const confirmDelete = document.getElementById("confirm-delete")
  confirmDelete?.addEventListener("click", requestDeleteUser)

  async function requestDeleteUser() {
    await $fetch(`https://gorest.co.in/public/v2/users/${userId}`, {
      headers: {
        Authorization: "Bearer 2c4b6fd4b874e0a0893fb93314cb10bd2b655cba76a738946da0be538e9905e6",
      },
      method: "DELETE",
    })

    openModal(false)
    confirmDelete?.removeEventListener("click", requestDeleteUser)
    fetchUsers()
  }
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
