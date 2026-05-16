<template>
  <ClientOnly>
    <VueEasyLightbox
      :visible="visible"
      :imgs="images"
      :index="index"
      :loop="true"
      @hide="emit('close')"
    />
  </ClientOnly>
</template>

<script setup>
import VueEasyLightbox from 'vue-easy-lightbox'

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['close'])
</script>
