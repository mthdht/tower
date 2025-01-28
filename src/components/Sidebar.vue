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
      <div v-for="component in availableComponents" :key="component.type" >
        <button
          class="w-full bg-sky-500 text-white py-2 px-4 rounded hover:bg-primary-dark"
          @click="$emit('add-component', component)"
        >
          {{ component.label }}
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
const availableComponents = [
  { type: 'text', label: 'Texte', content: 'Un texte par défaut', style: {
    fontSize: '12px',
    color: '#bada55',
    
  } },
  { type: 'button', label: 'Bouton', labelText: 'Cliquez ici', style: {
    fontSize: '18px',
    color: '#f1f1f1',
    
  } },
];
</script>

<style scoped>
/* Utilise des classes Tailwind */
</style>
