<template>
    <form @submit="editUser" class="max-w-lg mx-auto min-h-screen py-20">
        <div class="p-4 pt-0">
            <label for="name">Name</label>
            <input id="name" placeholder="Name" v-model="name"
                class="w-full mt-1.5 outline-[#7d27ffe0] rounded-md py-2 px-3 border border-gray-300 font-medium font-ibm-plex-sans"
                type="text">
        </div>
        <div class="p-4 pt-0">
            <label for="name">Email</label>
            <input id="email" placeholder="Email" v-model="email"
                class="w-full mt-1.5 outline-[#7d27ffe0] rounded-md py-2 px-3 border border-gray-300 font-medium font-ibm-plex-sans"
                type="text">
        </div>
        <div class="p-4 pt-0">
            <label for="gender">Gender</label>
            <select id="gender" v-model="gender"
                class="w-full mt-1.5 outline-[#7d27ffe0] rounded-md py-2 px-3 border border-gray-300 font-medium font-ibm-plex-sans"
                placeholder="Lokasi">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
        <div class="p-4 pt-0">
            <label for="status">Status</label>
            <select id="status" v-model="status"
                class="w-full mt-1.5 outline-[#7d27ffe0] rounded-md py-2 px-3 border border-gray-300 font-medium font-ibm-plex-sans"
                placeholder="Lokasi">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
        <div class="px-4">
            <button class="bg-[#FF8911] w-full text-white py-3 px-4 font-ibm-plex-sans font-semibold rounded-md">
                Edit
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: user }: any = await useFetch('https://gorest.co.in/public/v2/users/' + route.params.id)

const name = ref(user.value?.name)
const email = ref(user.value?.email)
const gender = ref(user.value?.gender)
const status = ref(user.value?.status)

async function editUser(event: Event) {
    event.preventDefault()

    await $fetch('https://gorest.co.in/public/v2/users/' + route.params.id, {
        headers: {
            Authorization: 'Bearer 2c4b6fd4b874e0a0893fb93314cb10bd2b655cba76a738946da0be538e9905e6'
        },
        method: 'PUT',
        body: {
            name: name.value,
            email: email.value,
            gender: gender.value,
            status: status.value
        }
    })

    router.back()
}

useHead({
    title: user.value?.name
})
</script>