<template>
    <header class="bg-[#7d27ffe0] text-center text-white py-20 px-6 lg:px-0">
        <h1 class="text-4xl font-raleway font-extrabold">{{ post.title }}</h1>
        <span class="font-ibm-plex-sanstext-lg my-4 block">{{ user.name }}</span>
    </header>
    <main class="py-10 md:py-20">
        <article class="max-w-xl mx-auto px-6 lg:px-0">
            <span class="font-ibm-plex-sans text-slate-800 text-lg my-4">{{ post.body }}</span>
        </article>
        <hr class="my-10 md:my-20">
        <section class="max-w-xl mx-auto px-6 lg:px-0">
            <header>
                <h2 class="font-ibm-plex-sans text-slate-800 text-xl font-semibold">Comments ({{ comments.length }})</h2>
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
const route = useRoute()

const postResponse: any = await useFetch('https://gorest.co.in/public/v2/posts/' + route.params.id)
const post = postResponse.data.value;

const userResponse: any = await useFetch(`https://gorest.co.in/public/v2/users/${post.user_id}`);
const user = userResponse.data.value;

const commentsResponse: any = await useFetch(`https://gorest.co.in/public/v2/posts/${post.id}/comments`);
const comments = commentsResponse.data.value;

useHead({
    title: post.title,
})
</script>