<template>
  <div class="flex justify-center py-8 border-t text-sm">
    <nav class="relative z-0 inline-flex gap-4 rounded-md shadow-sm" aria-label="Pagination">
      <button
        type="button"
        @click="emit('previous')"
        :class="{ '!bg-gray-100': props.page == 1 || loading }"
        :disabled="page == 1 || loading"
        class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 border border-gray-300 hover:bg-gray-50">
        <span class="sr-only">Previous</span>
        <IconPrevious />
      </button>
      <button
        type="button"
        @click="emit('to', 1)"
        :class="{
          'border-[#7d27ffe0] !bg-[#7d27ffe0] !text-white': page == 1,
          '!bg-gray-100': loading,
        }"
        :disabled="loading"
        class="hidden bg-white text-gray-500 hover:bg-gray-50 relative lg:inline-flex items-center px-4 py-2 text-sm font-medium border">
        1
      </button>

      <template v-if="page <= 2 || page >= totalPages - 1">
        <button
          type="button"
          @click="emit('to', 2)"
          :class="{ 'border-[#7d27ffe0] !bg-[#7d27ffe0] !text-white': page == 2 }"
          :disabled="loading"
          class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
          2
        </button>
        <span
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border">
          ...
        </span>
        <button
          type="button"
          @click="emit('to', totalPages - 1)"
          :class="{
            'border-[#7d27ffe0] !bg-[#7d27ffe0] !text-white': page == totalPages - 1,
            '!bg-gray-100': loading,
          }"
          :disabled="loading"
          class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
          {{ totalPages - 1 }}
        </button>
      </template>

      <template v-else>
        <span
          class="relative hidden lg:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border">
          ...
        </span>
        <button
          type="button"
          @click="emit('to', 1)"
          :class="{
            'border-[#7d27ffe0] !bg-[#7d27ffe0] !text-white': page == 1,
            '!bg-gray-100': loading,
          }"
          :disabled="loading"
          class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex lg:hidden items-center px-4 py-2 text-sm font-medium border">
          1
        </button>
        <button
          type="button"
          @click="emit('to', page - 1)"
          :disabled="loading"
          :class="{
            'border-[#7d27ffe0] !bg-[#7d27ffe0] !text-white': page == page - 1,
            '!bg-gray-100': loading,
          }"
          class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
          {{ page - 1 }}
        </button>
        <button
          type="button"
          @click="emit('to', page)"
          :class="{
            'border-[#7d27ffe0] !bg-[#7d27ffe0] !text-white': page == page,
            '!bg-gray-100': loading,
          }"
          :disabled="loading"
          class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
          {{ page }}
        </button>
        <button
          type="button"
          @click="emit('to', page + 1)"
          :class="{
            'border-[#7d27ffe0] !bg-[#7d27ffe0] !text-white': page == page + 1,
            '!bg-gray-100': loading,
          }"
          :disabled="loading"
          class="bg-white text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 text-sm font-medium border">
          {{ page + 1 }}
        </button>
        <span
          class="relative hidden lg:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border">
          ...
        </span>
      </template>

      <button
        type="button"
        @click="emit('to', totalPages)"
        :disabled="loading"
        :class="{
          'border-[#7d27ffe0] !bg-[#7d27ffe0] !text-white': page == totalPages,
          '!bg-gray-100': loading,
        }"
        class="hidden bg-white text-gray-500 hover:bg-gray-50 relative lg:inline-flex items-center px-4 py-2 text-sm font-medium border">
        {{ totalPages }}
      </button>
      <button
        type="button"
        @click="emit('next')"
        :class="{
          '!bg-gray-100': page == totalPages || loading,
        }"
        :disabled="page == totalPages || loading"
        class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border hover:bg-gray-50">
        <span class="sr-only">Next</span>
        <IconNext />
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["previous", "next", "to"])

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
})
</script>
