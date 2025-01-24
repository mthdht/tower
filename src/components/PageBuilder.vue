<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <Sidebar @add-block="addBlock" />
        
        <!-- Main Area -->
        <div class="flex-1 bg-gray-50 p-6">
            <BlockRenderer :blocks="blocks" @select-block="selectBlock"/>
        </div>

        <!-- Panneau de configuration -->
        <div v-if="selectedBlock" class="w-64 bg-white shadow-md p-4">
            <h2 class="text-lg font-bold mb-4">Configuration</h2>
            <div v-if="selectedBlock.type === 'text'">
                <label class="block mb-2">Texte :</label>
                <input
                type="text"
                v-model="selectedBlock.content"
                class="w-full border rounded p-2"
                />
            </div>
            <div v-if="selectedBlock.type === 'image'">
                <label class="block mb-2">Image URL :</label>
                <input
                type="text"
                v-model="selectedBlock.src"
                class="w-full border rounded p-2"
                />
            </div>
            <div v-if="selectedBlock.type === 'button'">
                <label class="block mb-2">Label du bouton :</label>
                <input
                type="text"
                v-model="selectedBlock.labelText"
                class="w-full border rounded p-2"
                />
            </div>
            <div v-if="selectedBlock.type === 'card'">
                <label class="block mb-2">Image URL :</label>
                <input
                    type="text"
                    v-model="selectedBlock.imageSrc"
                    class="w-full border rounded p-2 mb-4"
                />

                <label class="block mb-2">Titre :</label>
                <input
                    type="text"
                    v-model="selectedBlock.title"
                    class="w-full border rounded p-2 mb-4"
                />

                <label class="block mb-2">Description :</label>
                <textarea
                    v-model="selectedBlock.description"
                    class="w-full border rounded p-2"
                ></textarea>
            </div>

            <div v-if="selectedBlock.type === 'columns'">
                <label class="block mb-2">Nombre de colonnes :</label>
                <input
                    type="number"
                    v-model="selectedBlock.columnCount"
                    class="w-full border rounded p-2 mb-4"
                    min="1"
                    max="6"
                />
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import Sidebar from './Sidebar.vue';
import BlockRenderer from './BlockRenderer.vue';

const blocks = ref([]);
const selectedBlock = ref(null);


// Ajouter un bloc à la liste
const addBlock = (block) => {
    blocks.value.push({ ...block, id: Date.now() });
    console.log(blocks.value)
};

  // Sélectionner un bloc pour l'éditer
const selectBlock = (block) => {
    selectedBlock.value = block;
};

</script>
  
<style scoped>
/* Ajoute un style basique pour une meilleure visualisation */
</style>
