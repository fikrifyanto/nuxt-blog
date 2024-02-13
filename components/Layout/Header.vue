<template>
  <header class="bg-[#7d27ffe0] py-2 px-6 md:py-4 border-b lg:border-none">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <NuxtLink to="/">
        <IconLogo />
      </NuxtLink>
      <ul class="flex items-center gap-4 text-white font-ibm-plex-sans md:text-lg font-semibold">
        <li>
          <NuxtLink type="button" to="/user">List Users</NuxtLink>
        </li>
        <li>
          <NuxtLink type="button" to="/user/create">Add Users</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>
