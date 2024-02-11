<template>
    <header class="bg-[#7d27ffe0] text-center text-white py-20">
        <h1 class="text-4xl font-raleway font-extrabold">The Personal Blog</h1>
        <p class="font-ibm-plex-sans mt-2">Expand your SEO and marketing knowledge with<br />detailed tutorials
            and case studies.</p>
    </header>
    <main class="max-w-4xl mx-auto py-14 md:py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 px-6 lg:px-0 gap-14 md:gap-20">
            <template v-for="post in posts">
                <article>
                    <header>
                        <h2 class="text-3xl font-raleway font-extrabold text-[#7d27ffe0] hover:text-[#FF8911]">
                            <NuxtLink :to="`/${post.id}`" :title="`Permanent Link to ${post.title}`">
                                {{ post.title }}
                            </NuxtLink>
                        </h2>
                    </header>
                    <span class="font-ibm-plex-sans text-slate-800 text-lg my-4 block">{{ post.body }}</span>
                    <span class="font-raleway text-slate-700 font-medium text-lg">{{ post.user.name }}</span>
                </article>
            </template>
        </div>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: 'The Personal Blog',
})

function excerpt(text: string): string | null | undefined {
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    const threeSentences = sentences?.slice(0, 4);
    return threeSentences?.join('');
}

const postsResponse: any = await $fetch('https://gorest.co.in/public/v2/posts');

const posts = await Promise.all(postsResponse.map(async (post: any) => {
    post.body = excerpt(post.body);
    const userResponse = await $fetch(`https://gorest.co.in/public/v2/users/${post.user_id}`);
    post.user = userResponse;
    return post;
}));
</script>