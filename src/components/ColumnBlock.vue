<template>
    <div class="grid gap-4" :style="gridTemplate">
      <div
        v-for="(column, colIndex) in props.block.columnCount"
        :key="colIndex"
        class="border rounded p-4 bg-gray-50"
      >
          <!-- Rendu dynamique du contenu -->
          <component :is="getBlockComponent(item.type)" :block="item" />
      </div>
    </div>
</template>
  
<script setup>
import { computed } from 'vue';
import CardBlock from './CardBlock.vue';

// Props
const props = defineProps({
    block: {
        type: Object,
        required: true,
    },
});
  
// Fonction pour gérer les composants internes
const getBlockComponent = (type) => {
    const components = {
        card: CardBlock, // Gère les cartes pour l'instant
    };
    return components[type] || null;
};

// Ajouter une carte dans une colonne spécifique
const addCardToColumn = (colIndex) => {
    props.block.columns[colIndex].items.push({
        type: 'card',
        imageSrc: '',
        title: 'Titre par défaut',
        description: 'Description par défaut',
    });
};
  
  // Générer un style CSS pour la grille
const gridTemplate = computed(() => {
    return `grid-template-columns: repeat(${props.block.columnCount}, 1fr);`;
});
</script>
  