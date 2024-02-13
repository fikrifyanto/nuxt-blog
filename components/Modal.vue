<template>
  <div
    id="popup-modal"
    tabindex="-1"
    :class="{ flex: props.open, hidden: !props.open }"
    class="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full bg-black/50">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow border">
        <button
          type="button"
          @click="emit('close')"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          data-modal-hide="popup-modal">
          <IconClose />
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-10 text-center font-ibm-plex-sans">
          <IconWarning />
          <h3 class="mb-5 text-lg font-normal text-gray-500">
            {{ props.title }}
          </h3>
          <button
            @click="emit('confirm', props.id)"
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2 mt-2">
            {{ props.confirmTextButton }}
          </button>
          <button
            @click="emit('close')"
            data-modal-hide="popup-modal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-100 mt-2">
            {{ props.cancelTextButton }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close", "confirm"])

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  confirmTextButton: {
    type: String,
    required: true,
  },
  cancelTextButton: {
    type: String,
    required: true,
  },
  id: {
    type: [String, Number],
  },
})
</script>
