  <template>
    <div id="modal" v-if="isOpen"
      class="w-full h-full fixed top-0 left-0 bg-gray-900/60 z-50 flex justify-center items-center transition-opacity delay-150">
      <div class="relative w-150 h-200">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
              {{ title }}
            </h3>
            <button type="button" @click="toggleModal()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="small-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="p-4 md:p-5 space-y-4">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">

// Define the "toggle" event 
const emit = defineEmits(['toggle'])

// Emit the "toggle" event 
function toggleModal() {
  emit('toggle')
}

// Define the props
defineProps<{
  isOpen: boolean
  title: string
}>()
</script>
