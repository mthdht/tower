<template>
    <div class="w-64 bg-white shadow-md p-4">
      <h2 class="text-lg font-bold mb-4">Blocs Disponibles</h2>
      <div v-for="block in availableBlocks" :key="block.type" class="mb-2">
        <button
          class="w-full bg-sky-500 text-white py-2 px-4 rounded hover:bg-primary-dark"
          @click="$emit('add-block', block)"
        >
          {{ block.label }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  const availableBlocks = [
  { type: 'text', label: 'Texte', content: 'Un texte par défaut' },
  { type: 'image', label: 'Image', src: '' },
  { type: 'button', label: 'Bouton', labelText: 'Cliquez ici' },
  {
    type: 'card',
    label: 'Carte',
    imageSrc: '',
    title: 'Titre de la carte',
    description: 'Description de la carte',
  },
  {
    type: 'columns',
    label: 'Colonnes',
    columns: [],
    columnCount: 2
  },
  ];
  </script>
  
  <style scoped>
  /* Utilise des classes Tailwind */
  </style>
  