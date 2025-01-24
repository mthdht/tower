<template>
    <div class="border rounded shadow-md overflow-hidden">
      <!-- Image -->
      <img
        :src="block.imageSrc || 'https://via.placeholder.com/300x150'"
        alt="Image"
        class="w-full h-48 object-cover"
      />
      <!-- Contenu -->
      <div class="p-4">
        <h3 class="text-lg font-bold mb-2">{{ block.title || 'Titre par défaut' }}</h3>
        <p class="text-gray-600">{{ block.description || 'Description par défaut' }}</p>
      </div>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

defineProps({
    block: {
        type: Object,
        required: true,
    },
});
</script>
