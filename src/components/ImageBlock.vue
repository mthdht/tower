<template>
    <div class="flex justify-center items-center bg-gray-200 h-32 rounded">
      <img :src="props.block.src || 'https://via.placeholder.com/150'" alt="Image" />
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
  
const props = defineProps({
    block: {
      type: Object,
      required: true,
    },
});
</script>
  