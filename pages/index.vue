<template>
  <header class="bg-[#7d27ffe0] text-center text-white py-20">
    <h1 class="text-4xl font-raleway font-extrabold">The Personal Blog</h1>
    <p class="font-ibm-plex-sans mt-2">
      Personal Blog for Challenge Test stage <br />
      in synapsis.id
    </p>
  </header>
  <main class="max-w-4xl mx-auto py-14 md:py-20">
    <div class="grid grid-cols-1 md:grid-cols-2 px-6 lg:px-0 gap-14 md:gap-20">
      <template :key="post.id" v-for="post in posts.data">
        <article>
          <header>
            <h2 class="text-3xl font-raleway font-extrabold text-[#7d27ffe0] hover:text-[#FF8911]">
              <NuxtLink :to="`/${post.id}`" :title="`Permanent Link to ${post.title}`">
                {{ post.title }}
              </NuxtLink>
            </h2>
          </header>
          <span class="font-ibm-plex-sans text-slate-800 text-lg my-4 block">{{ post.body }}</span>
          <span v-if="post.user" class="font-raleway text-slate-700 font-medium text-lg">
            {{ post.user.name }}
          </span>
        </article>
      </template>
    </div>

    <!-- Pagination -->
    <ClientOnly>
      <Pagination
        class="mt-10"
        v-show="posts.totalPages > 1"
        :page="posts.page"
        :total-pages="posts.totalPages"
        :loading="posts.loading"
        @next="posts.page++"
        @previous="posts.page--"
        @to="posts.page = $event" />
    </ClientOnly>
  </main>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const app = useNuxtApp()

const posts = ref<any>({
  page: 1,
  totalPages: 0,
  data: 0,
  loading: true,
  per_page: 10,
})

async function fetchPosts() {
  posts.value.loading = true

  const { data } = await useFetch(`${config.public.API_URL}/public/v2/posts`, {
    params: {
      page: posts.value.page,
      per_page: posts.value.per_page,
    },
    onResponse({ request, response, options }) {
      const currentPage = response.headers.get("X-Pagination-Page")
      if (currentPage) {
        posts.value.page = parseInt(currentPage)
      }

      const totalPage = response.headers.get("X-Pagination-Pages")
      if (totalPage) {
        posts.value.totalPages = parseInt(totalPage)
      }
    },
  })

  posts.value.data = data.value
  posts.value.data = await Promise.all(
    posts.value.data.map(async (post: any) => {
      post.body = app.$excerpt(post.body)
      try {
        const { data: user } = await useFetch(
          `${config.public.API_URL}/public/v2/users/${post.user_id}`
        )
        post.user = user.value
      } catch (error) {
        post.user = {}
      }
      return post
    })
  )

  posts.value.loading = false
}

fetchPosts()

onMounted(() => {
  setTimeout(() => {
    fetchPosts()
  }, 100)
})

watch(
  () => posts.value.page,
  () => {
    fetchPosts()
  }
)

useHead({
  title: "The Personal Blog",
})
</script>
