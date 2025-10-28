  <template>
    <ModalUI :isOpen="isOpen" title="About User" @toggle="emitToggle">
      <div class="bg-gray-100 px-8 py-4" v-if="modalData">
        <p><strong class="text-sm">Name:</strong> {{ modalData.name }}</p>
        <p><strong class="text-sm">Username:</strong> {{ modalData.username }}</p>
        <p><strong class="text-sm">Email:</strong> {{ modalData.email }}</p>
        <p><strong class="text-sm">Phone:</strong> {{ modalData.phone }}</p>
        <p><strong class="text-sm">Website:</strong> {{ modalData.website }}</p>
        <div class="mt-5">
          <p><strong class="text-sm">Address:</strong>
            {{ modalData.address.suite }},
            {{ modalData.address.street }} str.,
            {{ modalData.address.city }} City,
          </p>
          <p><strong class="text-sm">Zipcode:</strong> {{ modalData.address.zipcode }}</p>
          <p><strong class="text-sm">GL:</strong> {{ modalData.address.geo.lat }} {{ modalData.address.geo.lng }}</p>
        </div>

        <div class="mt-5">
          <p><strong class="text-sm">Company: </strong>
            {{ modalData.company.name }},
          </p>
          <p class="ml-4">{{ modalData.company.catchPhrase }}</p>
          <p class="ml-4">{{ modalData.company.bs }}</p>
        </div>

      </div>
    </ModalUI>
  </template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { User } from '@/types/users'
import ModalUI from '../ui/ModalUi.vue';

// Define the "toggle" event 
const emit = defineEmits(['toggle'])

// Emit the "toggle" event with optional user data
function emitToggle(user?: User) {
  emit('toggle', user) 
}

// Define the props
defineProps<{
  isOpen: boolean
  modalData: User | null
}>()

</script>