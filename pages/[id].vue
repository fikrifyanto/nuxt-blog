<template>
  <header class="bg-[#7d27ffe0] text-center text-white py-20 px-6 lg:px-0">
    <h1 class="text-4xl max-w-4xl mx-auto font-raleway font-extrabold">{{ post.title }}</h1>
    <span v-if="user" class="font-ibm-plex-sanstext-lg my-4 block">{{ user.name }}</span>
  </header>
  <main class="py-10 md:py-20">
    <article class="max-w-xl mx-auto px-6 lg:px-0">
      <span class="font-ibm-plex-sans text-slate-800 text-lg my-4">{{ post.body }}</span>
    </article>
    <hr class="my-10 md:my-20" />
    <section class="max-w-xl mx-auto px-6 lg:px-0">
      <header>
        <h2 class="font-ibm-plex-sans text-slate-800 text-xl font-semibold">
          Comments ({{ comments.length }})
        </h2>
      </header>
      <ol class="flex flex-col gap-12 mt-6">
        <template v-for="comment in comments">
          <li>
            <cite class="font-raleway font-semibold not-italic">{{ comment.name }}</cite>
            <span class="font-ibm-plex-sans text-slate-600 text-sm block">{{ comment.email }}</span>
            <span class="font-ibm-plex-sans text-slate-800 block mt-6 border-b pb-4 ml-4">
              {{ comment.body }}
            </span>
          </li>
        </template>
      </ol>
    </section>
  </main>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()

const { data: post, error: postError }: any = await useFetch(
  `${config.public.API_URL}/public/v2/posts/${route.params.id}`
)

const { data: user, error: userError }: any = await useFetch(
  `${config.public.API_URL}/public/v2/users/${post.value.user_id}`
)
if (userError.value) user.value = user

const { data: comments }: any = await useFetch(
  `${config.public.API_URL}/public/v2/posts/${post.value.id}/comments`
)

useHead({
  title: post.value.title,
})
</script>
