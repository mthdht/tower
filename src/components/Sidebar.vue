<template>
  <div class="w-64 bg-white shadow-md p-4">
    <div class="tabs grid grid-cols-2 gap-2 mb-4">
      <button @click="panelToShow = 'layouts'" class="px-3 py-2 border rounded">layouts</button>
      <button @click="panelToShow = 'components'" class="px-3 py-2 border rounded">components</button>
    </div>

    <div class="layout-tab" v-show="panelToShow == 'layouts'">
      <div v-for="layout in availableLayouts" :key="layout.type" class="mb-2">
        <button
          class="w-full bg-sky-500 text-white py-2 px-4 rounded hover:bg-primary-dark"
          @click="$emit('add-section', layout)"
        >
          {{ layout.label }}
        </button>
      </div>
    </div>

    <div class="component-tab grid grid-cols-2 gap-2" v-show="panelToShow == 'components'">
      <div v-for="block in availableBlocks" :key="block.type" >
        <button
          class="w-full bg-sky-500 text-white py-2 px-4 rounded hover:bg-primary-dark"
          @click="$emit('add-component', block)"
        >
          {{ block.label }}
        </button>
      </div>
    </div>

  </div>
</template>
  
<script setup>
import { ref } from 'vue';

const panelToShow = ref('layouts')

const availableLayouts = [
  { type: '1-col', label: 'one col', columns: 1},
  { type: '2-col', label: 'two col', columns: 2}
]
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
];
</script>

<style scoped>
/* Utilise des classes Tailwind */
</style>
